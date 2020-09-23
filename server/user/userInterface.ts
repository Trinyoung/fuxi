import { BaseInterface } from '../base/baseInterface';
import { Document } from 'mongoose';
export interface User extends BaseInterface, Document {
  username: string,
  realName: string,
  birthday: number,
  gender: string,
  uid?: string,
  mobile: string,
  email:string,
  password: string,
}