/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-21 14:27:01
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\type.ts
 */
import { BaseService } from "../../base/baseService"
import { ArticleTypeModel } from '../models/article_types';
import { ArticleTypeInterface, CascaderTypeInterface } from '../interface';
import { FilterQuery } from "mongoose";
export class TypeService extends BaseService<ArticleTypeInterface> {
    constructor() {
        super(ArticleTypeModel);
    }

    async getListForTypes(query: FilterQuery<ArticleTypeInterface>) {
        const types = await this.getList(query, false);
        const result: CascaderTypeInterface[] = [];
        TypeService.cascaderForTypes(types as ArticleTypeInterface[], null, result);
        return result;
    }

    static cascaderForTypes(types: ArticleTypeInterface[], parent: CascaderTypeInterface, result?: CascaderTypeInterface[]) {
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            if (!parent && !type.parent || parent && JSON.stringify(type.parent) == JSON.stringify(parent.value.split('_')[1])) {
                let item: CascaderTypeInterface = {
                    label: type.title,
                    value: type.typeCode+'_'+type._id,
                };
                if (parent) {
                    if (!parent.children) {
                        parent.children = []
                    }
                    parent.children.push(item);
                } else {
                    result.push(item)
                }
                types.splice(i, 1);
                i--;
                TypeService.cascaderForTypes(types, item);
            }
        }
    }

    async getParentTypes(typeCode: string, id?: string, withTitle?: number) {
        if (id) {
            const type = await this.getItem({_id: id}, 'typeCode');
            typeCode = type.typeCode;
        }
        const length = typeCode.length;
        const parents = [typeCode];
        let i = 4;
        while (i < length - 2) {
            parents.push(typeCode.substr(0, i));
            i += 2
        }
        console.log(parents, 'parents================>')
        const typeList = await this.getList({ typeCode: { $in: parents } }, true, 'typeCode title');
        const result: {}[] = [];
        typeList.forEach(item => {
            if (withTitle) {
                result[(item.typeCode.length - 4) / 2] = item;
            } else {
                result[(item.typeCode.length - 4) / 2] = item.typeCode + '_' + item._id;
            }
            
        })
        return result;
    }
}

export const typeService = new TypeService(); 