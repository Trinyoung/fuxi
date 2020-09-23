/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:36:51
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:30:00
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\router.ts
 */
import * as Router from 'koa-router';
// import * as Koa from 'koa';
import userRouter from './server/user/router'
import articleRouter from './server/articles/router'
import tagRouter from './server/tags/router'

export default (router: Router) => {
  userRouter(router);
  articleRouter(router);
  tagRouter(router);
}