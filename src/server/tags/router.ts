/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:24:10
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\tags\router.ts
 */
import * as Router from 'koa-router';
import Controller from './controller';
export default (router: Router) => {
    const controller = new Controller();
    router.get('/tags', controller.getList.bind(controller));
    router.delete('/tags/:id');
};
