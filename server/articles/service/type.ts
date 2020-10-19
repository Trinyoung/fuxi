/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 19:21:03
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\type.ts
 */
import { BaseService } from "../../base/baseService"
import { ArticleTypeModel } from '../models/article_types';
import { ArticleTypeInterface } from '../interface';
import { User } from '../../user/userInterface';
import * as moment from 'moment';
import { FilterQuery, Model, UpdateQuery } from "mongoose";
export class TypeService extends BaseService<ArticleTypeInterface> {
    constructor() {
        super(ArticleTypeModel);
    }

    async getListForTypes (query:FilterQuery<ArticleTypeInterface>) {
        const types = await this.getList(query, true);
        
    }

    static cascaderForTypes (types:ArticleTypeInterface[], parent:ArticleTypeInterface) {
        for (let type of types) {
            if (!type.parent) {

            }
        }
    }
}

export const typeService = new TypeService(); 