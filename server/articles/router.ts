/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 16:44:01
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\router.ts
 */
import * as Router from 'koa-router';
import Controller from './controller/articleController';
import TypeController from './controller/typeController';
import ReadController from './controller/readerController';
export default (router: Router) => {
    const controller = new Controller();
    const typeController = new TypeController();
    const readController = new ReadController();
    router.post('/articles', controller.create.bind(controller));
    router.put('/articles/:id/favorite', )
    router.get('/articles/list', controller.getListByPage.bind(controller));
    router.get('/articles/:id', controller.getOne.bind(controller));
    router.get('/articles/:type/articles/list', controller.getListByPage.bind(controller));

    router.get('/articles/types/list', typeController.getListByPage.bind(typeController));
    router.post('/articles/reads', readController.create.bind(readController));
}