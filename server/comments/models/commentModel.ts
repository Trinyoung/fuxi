import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import { CommentInterface } from '../interface';

const commentSchema = new Schema({
    nilName: { type: String },
    email: { type: String },
    content: { type: String, required: true },
    reply: { type: Schema.Types.ObjectId },
    createdAt: { type: Number, required: true },
    articleId: { type: Schema.Types.ObjectId },
    createdBy: { type: String },
    is_deleted: { type: Number, required: true, default: 0 }
});

export const commentModel: PaginateModel<CommentInterface> = db('comments', commentSchema);