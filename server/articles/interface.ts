/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-20 17:01:53
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\interface.ts
 */
import { BaseInterface } from '../base/baseInterface';
import { Schema, Document } from 'mongoose';

enum category {
    single = 1,
    series = 2
}
enum yesorno {
    no = 0,
    yes = 1
}
interface baseCreated {
    createdAt: number,
    createdBy: string
}
export interface ArticleInterface extends BaseInterface, Document {
    title?: string,
    type?: string,
    category?: category, // 1 代表单篇幅文章， 2 代表系列文章
    public?: yesorno,
    subtitle?: string,
    content?: string,
    sourceUrl?: string,
    content_html?: string,
    is_deleted?:yesorno,
    refers?: [string],
    createdAt?: number,
    createdBy?: string,
    publised?: yesorno
    hasReads?: number,
    favorites?: number
}

export interface FavoriteInterface extends BaseInterface, Document {
    articleId?: Schema.Types.ObjectId,
    authorUid?: String
}

export interface ArticleTypeInterface extends BaseInterface, Document {
    title: string,
    parent: Schema.Types.ObjectId,
    typeCode: string,
    isTop: number
}

export interface TagInterface extends BaseInterface, Document {
    name: string
}

export interface ReadInterface extends BaseInterface, Document {
    articleId: Schema.Types.ObjectId,
    authorUid: string
}

export interface CascaderTypeInterface {
    label: string,
    // value: Schema.Types.ObjectId,
    // typeCode: string,
    value: string,
    // typeCode: string,
    children?: CascaderTypeInterface[]
}