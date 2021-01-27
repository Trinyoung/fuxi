/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 13:13:48
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:47:04
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\models\reader.ts
 */
import db from '../../../db/mongo/mongo';
import { PaginateModel, Schema } from 'mongoose';
import { ReadInterface } from '../interface';
const ReaderSchema = new Schema({
    createdAt: { type: Number, required: true },
    articleId: { type: Schema.Types.ObjectId, required: true },
    authorUid: { type: String, required: true },
    is_deleted: { type: Number, required: true, default: 0 }
});

export const ReadModel: PaginateModel<ReadInterface> = db('reader', ReaderSchema);