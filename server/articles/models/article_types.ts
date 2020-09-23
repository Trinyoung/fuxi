/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:21
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:46:08
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
    parent: { type: String },
    cover_url: String,
    tags: [{ type: Schema.Types.ObjectId }],
    createdAt: { type: Number, default: moment().unix() },
    updatedAt: { type: Number, default: moment().unix() },
    createdBy: { type: String, refs: 'user' },
    updatedBy: { type: String, ref: 'user' },
    is_deleted: { type: Number, default: 0 }
});

ArticleTypeSchema.plugin(mongoosePaginate);
ArticleTypeSchema.plugin(uniqueValidator);
export const ArticleTypeModel: PaginateModel<ArticleTypeInterface> = db('articleType', ArticleTypeSchema);