/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:36:51
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-24 08:44:07
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\router.ts
 */
import * as Router from 'src/server/user/node_modules/koa-router';
// import * as Koa from 'koa';
import userRouter from './server/user/router'
import articleRouter from './server/articles/router'
import tagRouter from './server/tags/router'
import testRouter from './test'
import commentRouter from './server/comments/router'
export default (router: Router) => {
  userRouter(router);
  articleRouter(router);
  tagRouter(router);
  testRouter(router);
  commentRouter(router);
}