/*
 * @Author: your name
 * @Date: 2021-01-13 21:24:29
 * @LastEditTime: 2021-01-14 10:17:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\user\userInterface.ts
 */
import { BaseInterface } from '../base/baseInterface';
import { Document } from 'mongoose';
export interface User extends BaseInterface {
  username?: string,
  realName?: string,
  birthday?: number,
  gender?: string,
  uid?: string,
  mobile?: string,
  email?:string,
  password?: string,
}