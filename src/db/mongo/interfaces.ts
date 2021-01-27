/*
 * @Author: your name
 * @Date: 2020-09-23 16:03:09
 * @LastEditTime: 2021-01-20 15:01:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\db\mongo\interfaces.ts
 */
import { Document } from 'mongoose';
export interface updateOption {
    upsert: boolean;
    multi: boolean,
    writeConcern: Document,
    collation: Document,
    arrayFilters: Document[];
    hint: Document | string
};
