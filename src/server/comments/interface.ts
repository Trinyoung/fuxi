/*
 * @Author: your name
 * @Date: 2021-01-13 15:21:58
 * @LastEditTime: 2021-01-14 08:45:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\comments\interface.ts
 */
import { BaseInterface, YesOrNo } from '../base/baseInterface';
import { Schema, Document } from 'mongoose';
import { ArticleBaseInterface } from '../articles/interface';
export interface CommentInterface extends ArticleBaseInterface {
    articleId?: Schema.Types.ObjectId,
    content?: string,
    favoriteNum?: number,
    isTop?: YesOrNo,
    parent?: Schema.Types.ObjectId,
    nilName?: string,
    email?: string,
    authorUid?: string,
    reply?: Schema.Types.ObjectId
}

export interface CommentFavoriteInterface extends BaseInterface, Document {
    commentId?: Schema.Types.ObjectId,
    createdBy?: string
}