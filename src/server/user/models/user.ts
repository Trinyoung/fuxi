/*
 * @Author: your name
 * @Date: 2021-01-13 21:24:29
 * @LastEditTime: 2021-01-20 14:13:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\user\models\user.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { User } from '../userInterface';
import * as moment from 'moment';

const UserModel = new Schema({
    username: { type: String, required: true },
    realName: { type: String },
    password: { type: String, required: true },
    birthday: { type: Number },
    gender: { type: String, enum: [0, 1, 2], default: 0 }, // 0 未知， 1-男， 2：
    createdAt: { type: Number, default: moment().unix()},
    updatedAt: { type: Number, default: moment().unix()},
    uid: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, requried: true, unique: true },
    is_deleted: { type: Number, enum: [0, 1], required: true, default: 0 }
});

UserModel.pre<User>('save', function (next) {
    // const user = this;
    this.uid = this.uid.replace(/-/g, '');
    next();
});
UserModel.plugin(mongoosePaginate);
UserModel.plugin(uniqueValidator);
export const UserSchema: PaginateModel<User> = db('user', UserModel);