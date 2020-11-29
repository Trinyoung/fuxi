/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:36:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-27 19:14:45
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\router.ts
 */
import * as Router from 'koa-router';
// import * as Koa from 'koa';
import userRouter from './server/user/router'
import articleRouter from './server/articles/router'
import tagRouter from './server/tags/router'
// import testRouter from './test'
import commentRouter from './server/comments/router'
export default (router: Router) => {
  userRouter(router);
  articleRouter(router);
  tagRouter(router);
  commentRouter(router);
}