/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-12 20:53:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-20 09:19:15
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\models\article_model.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { ArticleInterface } from '../interface';


const ArticleSchema = new Schema({
    title: String,
    type: { type: Schema.Types.ObjectId, ref: 'articleType' },
    category: { type: Number, enum: [1, 2, 3] }, // 1 代表单篇幅文章， 2 代表系列文章
    published: { type: Number, enum: [0, 1], default: 0 }, // 0- 未发布，1-已发布
    isPublic: { type: Number, enum: [0, 1] }, // 是否公开
    refers: [{ title: String, link: String }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'tag' }],
    is_deleted: { type: Number, default: 0 },
    hasReads: { type: Number, default: 0 },
    favoriteNums: { type: Number, default: 0 },
    isMarkdown: { type: Number, enum: [0, 1], default: 1 },
    subtitle: String,
    content: String,
    abstract: String,
    content_html: String,
    createdAt: Number,
    updatedAt: Number,
    createdBy: { type: String }, // uid
    updatedBy: { type: String },
    sourceUrl: String
});
ArticleSchema.virtual('author', {
    ref: 'user',
    localField: 'createdBy',
    foreignField: 'uid',
    justOne: true
});
ArticleSchema.plugin(mongoosePaginate);
ArticleSchema.plugin(uniqueValidator);
export const ArticleModel: PaginateModel<ArticleInterface> = db('article', ArticleSchema);