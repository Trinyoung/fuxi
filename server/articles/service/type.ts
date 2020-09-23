/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-14 18:59:48
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \process2\server\articles\service\type.ts
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

    public async createItem(uid: string, body: ArticleTypeInterface) {
        try {
            body.createdBy = uid;
            body.updatedBy = uid;
            const code = await this.generateTypeCode(body.typeCode, body.isTop);
            body.typeCode = code;
            const typeModel = new this.model(body)
            return typeModel.save()
        } catch (error) {
            throw error;
        }
    }


    public async generateTypeCode(code: string, isTop: number) {
        if (isTop) {
            if (code.length !== 4) {
                throw new Error('类型code过长')
            }
            return code;
        } else {
            const codes = await ArticleTypeModel.aggregate([
                { $match: { typeCode: { $regex: code } } },
                { $project: { max: { $max: 'typeCode' } } }
            ]);
            const subfix = code.substr(4);
            const subNo = Number(subfix) + 1;
            return this.fillZero(subNo, subfix.length);
        }
    }

    public async fillZero(number: number, length:number) {
        const NoToStr = number.toString();
        let returnStr = NoToStr;
        for ( let i = 0; i < length - NoToStr.length; i++) {
            returnStr = '0' + returnStr;
        }
        return returnStr;
    }
}

export const typeService = new TypeService(); 