import db from '../../../db/mongo/mongo';
import { Schema, Document } from 'mongoose';
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