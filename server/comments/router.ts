import * as Router from 'koa-router';
import CommentController from './controller/commentController';
export default (router: Router) => {
    const controller = new CommentController();

    router.get('/comments/:ariticleId/list', controller.getListByPage.bind(controller));
    router.post('/comments/:articleId', controller.create.bind(controller));
    router.delete('/comments/:id', controller.delete.bind(controller));
}