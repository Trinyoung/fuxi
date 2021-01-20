/*
 * @Author: your name
 * @Date: 2021-01-13 15:21:58
 * @LastEditTime: 2021-01-20 13:54:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\comments\service\favoriteService.ts
 */
import { BaseService } from '../../base/baseService';
import { commentFavoriteModel } from '../models/favoriteModel';
import { CommentFavoriteInterface } from '../interface';

export class CommentFavoriteService extends BaseService<CommentFavoriteInterface> {
    constructor () {
        super(commentFavoriteModel);
    }
}
export const commentFavoriteService = new CommentFavoriteService();
