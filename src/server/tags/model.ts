import db from '../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import * as uniqueValidator from 'mongoose-unique-validator';
import { TagInterface } from './interface';
import * as moment from 'moment';


const TagSchema = new Schema({
    name: { type: String, unique: true },
    createdAt: { type: Number, default: moment().unix() },
    updatedAt: { type: Number, default: moment().unix() },
    is_deleted: { type: Number, default: 0 },
    createdBy: { type: String, ref: 'User' },
    updatedBy: { type: String, ref: 'User' }
});

TagSchema.plugin(mongoosePaginate);
TagSchema.plugin(uniqueValidator);
export const TagModel: PaginateModel<TagInterface> = db('tag', TagSchema);