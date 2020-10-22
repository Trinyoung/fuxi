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
export default (router: Router) => {
    const controller = new CommentController();

    router.get('/comments/:articleId/list', controller.getListForComments.bind(controller));
    router.post('/comments', controller.create.bind(controller));
    router.delete('/comments/:id', controller.delete.bind(controller));
}