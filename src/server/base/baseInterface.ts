/*
 * @Author: your name
 * @Date: 2021-01-13 21:24:29
 * @LastEditTime: 2021-01-20 16:36:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\base\baseInterface.ts
 */
/* eslint-disable no-unused-vars */
import { Document } from 'mongoose';

export interface BaseInterface extends Document {
  updatedAt?: number,
  updatedBy?: string,
  is_deleted?: number,
  createdAt?: number,
  createdBy?: string
}

export interface playLoadInterface {
  exp: number,
  username: string
}

export interface populateInterface {
  path: string,
  match?: Object,
  select?: string,
  options?: { limit: number }
}
export enum YesOrNo {
  NO = 0,
  Yes = 1
}

// export interface keyOf {
//   [string]:
// }
