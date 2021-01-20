/*
 * @Author: your name
 * @Date: 2021-01-13 15:21:58
 * @LastEditTime: 2021-01-20 16:18:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\user\models\confirmCode.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema } from 'mongoose';
import * as moment from 'moment';

const confirmCode = new Schema({
    username: String,
    email: String,
    code: String,
    hasConfirmed: { type: Boolean, default: false },
    expiryTime: { type: Number },
    createdAt: { type: Number, default: moment().unix() }
});
export const ConfirmCodeSchema = db('confirmCode', confirmCode);
