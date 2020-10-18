/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 19:41:39
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\router.ts
 */
import * as Router from 'koa-router';
import Controller from './controller/articleController';
import TypeController from './controller/typeController';
import ReadController from './controller/readerController';
import FavoriteController from './controller/favoriteController';
export default (router: Router) => {
    const controller = new Controller();
    const typeController = new TypeController();
    const readController = new ReadController();
    const favoriteController = new FavoriteController();
    router.get('/articles/list', controller.getListByPage.bind(controller));
    router.get('/articles/:id', controller.getOne.bind(controller));
    router.get('/articles/:type/articles/list', controller.getListByPage.bind(controller));

    router.get('/articles/types/list', typeController.getListByPage.bind(typeController));
    router.get('/articles/types/all', typeController.getList.bind(typeController));
    router.post('/articles/reads', readController.create.bind(readController));

    router.post('/articles/favorites', favoriteController.create.bind(favoriteController));
    router.get('/articles/favorites/articleteId', favoriteController.getOne.bind(favoriteController));
    router.get('/aritcles/favorites/nums', favoriteController.getNums.bind(favoriteController))
    router.delete('/articles/favorites/:favoriteId', favoriteController.delete.bind(favoriteController));
}