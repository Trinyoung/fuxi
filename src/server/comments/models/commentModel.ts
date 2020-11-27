import db from '../../../db/mongo/mongo';
import { Schema, PaginateModel } from 'mongoose';
import { CommentInterface } from '../interface';

const commentSchema = new Schema({
    nilName: { type: String },
    email: { type: String },
    favoriteNum: { type: Number, default: 0 },
    content: { type: String, required: true },
    reply: { type: Schema.Types.ObjectId },
    parent: { type: Schema.Types.ObjectId },
    isTop: { type: Number, enum: [0, 1], default: 1 },
    createdAt: { type: Number, required: true },
    articleId: { type: Schema.Types.ObjectId, required: true },
    authorUid: { type: String, required: true }, // 文章作者的uid
    createdBy: { type: String },
    is_deleted: { type: Number, required: true, default: 0 }
});

export const commentModel: PaginateModel<CommentInterface> = db('comments', commentSchema);