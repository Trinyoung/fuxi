/* eslint-disable no-unused-vars */
/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 16:36:06
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\interface.ts
 */
import { BaseInterface, YesOrNo } from '../base/baseInterface';
import { Schema, Document } from 'mongoose';

export enum category {
    single = 1,
    series = 2
}
export interface ArticleInterface extends BaseInterface, Document {
    title?: string,
    type?: string,
    category?: category, // 1 代表单篇幅文章， 2 代表系列文章
    abstract?: string,
    public?: YesOrNo,
    subtitle?: string,
    content?: string,
    sourceUrl?: string,
    content_html?: string,
    is_deleted?: YesOrNo,
    refers?: [string],
    createdAt?: number,
    createdBy?: string,
    publised?: YesOrNo
    hasReads?: number,
    favoriteNums?: number
}
export interface ArticleTypeInterface extends BaseInterface {
    title?: string,
    parent?: Schema.Types.ObjectId,
    typeCode?: string,
    isTop?: number,
    articles?: ArticleInterface []
}
export interface ArticleBaseInterface extends BaseInterface, Document {
    articleId?: Schema.Types.ObjectId,
}
export interface FavoriteInterface extends ArticleBaseInterface {
    // articleId: Schema.Types.ObjectId,
    authorUid?: String
}

export interface TagInterface extends BaseInterface {
    name: string
}

export interface ReadInterface extends ArticleBaseInterface {
    articleId?: Schema.Types.ObjectId,
    authorUid?: string
}

export interface CascaderTypeInterface {
    label: string,
    value: string,
    type?: number,
    createdAt?: number,
    children?: CascaderTypeInterface[]
}
