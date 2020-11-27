import { BaseService } from '../../base/baseService';
import { commentFavoriteModel } from '../models/favoriteModel';
import { CommentFavoriteInterface } from '../interface';

export class CommentFavoriteService extends BaseService<CommentFavoriteInterface> { 
    constructor () {
        super(commentFavoriteModel)
    }
}
export const  commentFavoriteService = new CommentFavoriteService();