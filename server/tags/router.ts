/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:38
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 16:42:10
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\tags\router.ts
 */
import * as Router from 'koa-router';
import Controller from './controller';
import { getTagsFromCache } from './middleware';
export default (router: Router) => {
    const controller = new Controller();
    router.get('/tags', controller.getList.bind(controller));
}