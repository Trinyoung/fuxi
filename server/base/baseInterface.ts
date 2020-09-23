import { Document } from "mongoose";

export interface BaseInterface extends Document{
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