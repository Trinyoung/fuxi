import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import { CommentInterface } from '../interface';

const commentFavoriteSchema = new Schema({
    createdAt: { type: Number, required: true },
    commentId: { type: Schema.Types.ObjectId },
    createdBy: { type: String },
    is_deleted: { type: Number, required: true, default: 0 }
});

export const commentModel: PaginateModel<CommentInterface> = db('commentFavorite', commentFavoriteSchema);