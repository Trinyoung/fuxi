import db from '../../../db/mongo/mongo';
import { Schema, Document } from 'mongoose';

const LoginHistory = new Schema({
    username: String,
    createdAt: Number
});
export const LoginHistorySchema = db('loginHistory', LoginHistory);