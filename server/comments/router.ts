/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-19 15:57:57
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-22 19:27:30
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\comments\router.ts
 */
import * as Router from 'koa-router';
import CommentController from './controller/commentController';
import CommentFavoriteController from './controller/favoriteController';
import CommentMiddleware from './middleware';
export default (router: Router) => {
    const controller = new CommentController();
    const favoriteController = new CommentFavoriteController();
    const commentMiddleware = new CommentMiddleware();

    router.get('/comments/:articleId/list', controller.getListForComments.bind(controller));
    router.post('/comments', commentMiddleware.commentVisitInfo, controller.create.bind(controller));
    router.delete('/comments/:id', controller.delete.bind(controller));

    router.post('/comments/favorites', commentMiddleware.addCommentFavoriteNum, favoriteController.create.bind(favoriteController));
}