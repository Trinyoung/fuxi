/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-20 18:31:44
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\type.ts
 */
import { BaseService } from "../../base/baseService"
import { ArticleTypeModel } from '../models/article_types';
import { ArticleTypeInterface, CascaderTypeInterface } from '../interface';
// import { User } from '../../user/userInterface';
// import * as moment from 'moment';
import { FilterQuery, Model, Schema, UpdateQuery } from "mongoose";
export class TypeService extends BaseService<ArticleTypeInterface> {
    constructor() {
        super(ArticleTypeModel);
    }

    async getListForTypes(query: FilterQuery<ArticleTypeInterface>) {
        const types = await this.getList(query, false);
        const result:CascaderTypeInterface[] = [];
        TypeService.cascaderForTypes(types as ArticleTypeInterface[], null, result);
        return result;
    }

    static cascaderForTypes(types: ArticleTypeInterface[], parent: CascaderTypeInterface, result: CascaderTypeInterface[]) {
        for (let i = 0; i<types.length; i++) {
            const type = types[i]
            if (!parent) {
                if (!type.parent) {
                    let item: CascaderTypeInterface = {
                        label: type.title,
                        value: {
                            id: type._id,
                            typeCode: type.typeCode
                        },
                        children: []
                    };
                    result.push(item);
                    types.splice(i, 1);
                    i--;
                    TypeService.cascaderForTypes(types, item, item.children);
                }
            } else {
                if (JSON.stringify(type.parent) === JSON.stringify(parent.value.id)) {
                    let item: CascaderTypeInterface = {
                        label: type.title,
                        value: {
                            id: type._id,
                            typeCode: type.typeCode
                        },
                        children: []
                    };
                    result.push(item);
                    types.splice(i, 1);
                    i--;
                    TypeService.cascaderForTypes(types, item, item.children);
                }
            }
        }
    }
}

export const typeService = new TypeService(); 