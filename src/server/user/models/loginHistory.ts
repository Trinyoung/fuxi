/*
 * @Author: your name
 * @Date: 2021-01-13 15:21:58
 * @LastEditTime: 2021-01-20 14:16:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\user\models\loginHistory.ts
 */
import db from '../../../db/mongo/mongo';
import { Schema } from 'mongoose';

const LoginHistory = new Schema({
    username: String,
    createdAt: Number
});
export const LoginHistorySchema = db('loginHistory', LoginHistory);
