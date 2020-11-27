/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 13:13:48
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:46:52
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\models\favorite.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import { FavoriteInterface } from '../interface';

const favoriteSchema = new Schema({
    createdAt: { type: Number, required: true },
    articleId: { type: Schema.Types.ObjectId, required: true },
    authorUid: { type: String, required: true },
    createdBy: { type: String },
    is_deleted: { type: Number, required: true, default: 0 }
});

export const favoriteModel: PaginateModel<FavoriteInterface>= db('favorite', favoriteSchema);