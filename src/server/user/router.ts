/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 13:54:07
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\user\router.ts
 */
import UserController from './controller';
import * as Router from 'koa-router';
export default (router: Router) => {
    const controller = new UserController();
    router.get('/user/userInfo', controller.getUserInfo.bind(controller));
};
