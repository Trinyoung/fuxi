import * as Router from 'koa-router';
import CommentController from './controller/commentController';
export default (router: Router) => {
    const controller = new CommentController();

    router.get('/comments/:articleId/list', controller.getList.bind(controller));
    router.post('/comments', controller.create.bind(controller));
    router.delete('/comments/:id', controller.delete.bind(controller));
}