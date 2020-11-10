import { BaseInterface, YesOrNo } from '../base/baseInterface';
import { Schema, Document } from 'mongoose';
export interface CommentInterface extends BaseInterface, Document {
    articleId?: Schema.Types.ObjectId,
    content?: string,
    favoriteNum?: number,
    isTop?: YesOrNo,
    parent: Schema.Types.ObjectId,
    nilName?: string,
    email?: string,
    reply?: Schema.Types.ObjectId
}

export interface CommentFavoriteInterface extends BaseInterface, Document {
    commentId: Schema.Types.ObjectId,
    uid?: string
}