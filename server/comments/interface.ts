import { BaseInterface, YesOrNo } from '../base/baseInterface';
import { Schema, Document } from 'mongoose';
import { ArticleBaseInterface } from '../articles/interface';
export interface CommentInterface extends ArticleBaseInterface {
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
    createdBy?: string
}