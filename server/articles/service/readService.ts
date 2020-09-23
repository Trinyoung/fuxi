/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 13:12:54
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \process2\server\articles\service\readService.ts
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
    
    
}

export const typeService = new TypeService(); 