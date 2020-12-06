/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-25 11:06:02
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\router.ts
 */
import * as Router from 'koa-router';
import Controller from './controller/articleController';
import TypeController from './controller/typeController';
import ReadController from './controller/readerController';
import FavoriteController from './controller/favoriteController';
import ArticleMiddleWare from './middleware';

export default (router: Router) => {
    const controller = new Controller();
    const typeController = new TypeController();
    const readController = new ReadController();
    const favoriteController = new FavoriteController();
    const articleMiddleWare = new ArticleMiddleWare();
    router.get('/articles/list', controller.getListByPageForAriticle.bind(controller));
    router.get('/articles/nums', controller.getArticleNums.bind(controller));
    router.get('/articles/:id', controller.getOne.bind(controller));
    router.get('/articles/:type/articles/list', controller.getListByPage.bind(controller));
    router.get('/articles/list/hot', controller.getHotArticles.bind(controller));
    router.get('/articles/list/new', controller.getNewArticles.bind(controller));
    router.get('/articles/list/authors/hot', controller.getHotAuthors.bind(controller));

    router.get('/articles/types/list', typeController.getListByPage.bind(typeController));
    router.get('/articles/types/all', typeController.cascaderForTypes.bind(typeController));
    router.post('/articles/reads', articleMiddleWare.setReadMiddleware, readController.create.bind(readController));
    router.get('/articles/types/parent', typeController.getParentTypes.bind(typeController));
    router.get('/articles/types/tree', typeController.getTypesTree.bind(typeController));

    router.post('/articles/favorites',  articleMiddleWare.setFavoriteMiddleware, favoriteController.create.bind(favoriteController));
    router.get('/articles/favorites/:articleId', favoriteController.getOne.bind(favoriteController));
    router.get('/aritcles/favorites/nums', favoriteController.getNums.bind(favoriteController));
    router.delete('/articles/favorites/:favoriteId', favoriteController.delete.bind(favoriteController));
}