/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-15 14:58:25
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\models\article_types.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { ArticleTypeInterface } from '../interface';
import * as moment from 'moment';


const ArticleTypeSchema = new Schema({
    title: { type: String, unique: true },
    typeCode: { type: String, unique: true },
    description: String,
    isTop: { type: Number, enum: [0, 1]},
    parent: { type: Schema.Types.ObjectId },
    cover_url: String,
    tags: [{ type: Schema.Types.ObjectId, ref:'tag' }],
    createdAt: { type: Number, default: moment().unix() },
    updatedAt: { type: Number, default: moment().unix() },
    createdBy: { type: String, ref: 'user' },
    updatedBy: { type: String, ref: 'user' },
    is_deleted: { type: Number, default: 0 }
});
ArticleTypeSchema.virtual('author', {
    ref: 'user',
    localField: 'createdBy',
    foreignField: 'uid',
    justOne: true
});
ArticleTypeSchema.plugin(mongoosePaginate);
ArticleTypeSchema.plugin(uniqueValidator);
export const ArticleTypeModel: PaginateModel<ArticleTypeInterface> = db('articleType', ArticleTypeSchema);