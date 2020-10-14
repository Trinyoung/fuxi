import { BaseInterface } from '../base/baseInterface';
import { Schema, Document } from 'mongoose';
export interface CommentInterface extends BaseInterface, Document {
    articleId: Schema.Types.ObjectId,
    content: string,
    nilName: string,
    email: string,
    reply: Schema.Types.ObjectId
}

export interface commentFavoriteInterface extends BaseInterface, Document {
    commentId?: Schema.Types.ObjectId
}