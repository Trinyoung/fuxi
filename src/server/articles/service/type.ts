/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 16:12:46
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\type.ts
 */
import { BaseService } from '../../base/baseService';
import { ArticleTypeModel } from '../models/article_types';
import { ArticleTypeInterface, CascaderTypeInterface } from '../interface';
import { FilterQuery } from 'mongoose';
export class TypeService extends BaseService<ArticleTypeInterface> {
    constructor () {
        super(ArticleTypeModel);
    }

    async getListForTypes (query: FilterQuery<ArticleTypeInterface>) {
        const types = await this.getList(query, false);
        const result: CascaderTypeInterface[] = [];
        TypeService.cascaderForTypes(types as ArticleTypeInterface[], null, result);
        return result;
    }

    static cascaderForTypes (types: ArticleTypeInterface[], parent: CascaderTypeInterface, result?: CascaderTypeInterface[]) {
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            if (!type.parent || parent && JSON.stringify(type.parent) === JSON.stringify(parent.value.split('_')[1])) {
                const item: CascaderTypeInterface = {
                    label: type.title,
                    value: type.typeCode + '_' + type._id
                };
                if (type.parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(item);
                } else {
                    result.push(item);
                }
                types.splice(i, 1);
                i--;
                TypeService.cascaderForTypes(types, item, result);
            }
        }
    }

    async getParentTypes (typeCode: string, id?: string, withTitle?: number) {
        if (id) {
            const type = await this.getItem({ _id: id }, 'typeCode');
            typeCode = type.typeCode;
        }
        const length = typeCode.length;
        const parents = [typeCode];
        let i = 4;
        while (i < length - 2) {
            parents.push(typeCode.substr(0, i));
            i += 2;
        }
        const typeList = await this.getList({ typeCode: { $in: parents } }, true, 'typeCode title');
        const result: {}[] = [];
        typeList.forEach((item) => {
            if (withTitle) {
                result[(item.typeCode.length - 4) / 4] = item;
            } else {
                result[(item.typeCode.length - 4) / 4] = item.typeCode + '_' + item._id;
            }
        });
        return result;
    }

    async getTypesTree (query: FilterQuery<ArticleTypeInterface>) {
        const types = await ArticleTypeModel.aggregate([
            { $match: Object.assign(query, { is_deleted: 0 }) },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'type',
                    as: 'articles'
                }
            },
            {
                $project: {
                    title: 1,
                    typeCode: 1,
                    parent: 1,
                    isTop: 1,
                    'articles.title': 1,
                    'articles.type': 1,
                    'articles.createdAt': 1,
                    'articles._id': 1,
                    createdBy: 1,
                    createdAt: 1,
                    description: 1
                }
            },
            {
                $sort: { _id: -1 }
            }
        ]);
        const result: CascaderTypeInterface[] = [];
        TypeService.typesTree(types as ArticleTypeInterface[], null, result);
        return result;
    }

    static typesTree (types: ArticleTypeInterface[], parent: CascaderTypeInterface, result?: CascaderTypeInterface[]) {
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            if ((!type.parent || parent) && JSON.stringify(type.parent) === JSON.stringify(parent.value)) {
                const item: CascaderTypeInterface = {
                    label: type.title,
                    value: type._id,
                    type: 1,
                    createdAt: type.createdAt
                };
                if (type.articles && type.articles.length > 0) {
                    item.children = type.articles.map(item => ({
                        label: item.title,
                        value: item._id,
                        type: 2,
                        createdAt: item.createdAt
                    }));
                }
                if (type.parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.unshift(item);
                } else {
                    result.push(item);
                }
                types.splice(i, 1);
                i--;
                TypeService.typesTree(types, item, result);
            }
        }
    }
}

export const typeService = new TypeService();
