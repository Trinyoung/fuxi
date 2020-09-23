/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:30
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 16:20:30
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\user\router.ts
 */
import UserController from './controller';
import * as Router from 'koa-router';
export default (router: Router) => {
  let controller = new UserController();
}