/*
 * @Author: your name
 * @Date: 2020-09-23 16:03:09
 * @LastEditTime: 2020-11-27 19:07:36
 * @LastEditors: your name
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

// export 