import { BaseInterface } from "../base/baseInterface";
import { Schema, Document } from 'mongoose';

export interface ArticleTypeInterface extends BaseInterface, Document {
    title: string,
    parent: Schema.Types.ObjectId,
    typeCode: string,
    isTop: number
}