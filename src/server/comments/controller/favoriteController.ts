import { BaseController } from "../../base/baseController";
// import {CommentFavoriteInterface} from '../interface';
import {CommentFavoriteService, commentFavoriteService} from '../service/favoriteService';

export default class CommentFavoriteController extends BaseController<CommentFavoriteService> {
    constructor() {
        super(commentFavoriteService)
    }
}