/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 13:13:48
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 13:16:41
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \process2\server\articles\models\reader.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema } from 'mongoose';

const ReadModel = new Schema({
    createdAt: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId },
    is_deleted: { tpe: Number, required: true }
});

export const ReaderSchema = db('reader', ReadModel);