/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:36:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:03:34
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\router.ts
 */
import * as Router from 'koa-router';
import userRouter from './server/user/router';
import articleRouter from './server/articles/router';
import tagRouter from './server/tags/router';
import commentRouter from './server/comments/router';
export default (router: Router) => {
    userRouter(router);
    articleRouter(router);
    tagRouter(router);
    commentRouter(router);
};
