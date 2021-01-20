/*
 * @Author: your name
 * @Date: 2021-01-13 15:21:58
 * @LastEditTime: 2021-01-20 14:09:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\tags\service.ts
 */
import { BaseService } from '../base/baseService';
import { TagInterface } from './interface';
import { TagModel } from './model';
export class TagService extends BaseService<TagInterface> {
    constructor () {
        super(TagModel);
    }
}

export const tagService = new TagService();
