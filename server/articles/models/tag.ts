/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:56
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:42:04
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\models\tag.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { TagInterface } from '../interface';


const TagSchema = new Schema({
    name: {type: String, unique: true},
    createdBy: String,
    createdAt: Number,
    updatedAt: Number,
    updatedBy: String
});

TagSchema.plugin(mongoosePaginate);
TagSchema.plugin(uniqueValidator);
export const TagModel: PaginateModel<TagInterface> = db('tag', TagSchema);