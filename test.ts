/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-24 08:41:01
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-24 08:52:25
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\test.ts
 */
import * as Router from 'koa-router';
export default (router: Router) => {
    router.get('/api/user', async (ctx, next) => {
        await next();
        ctx.body = '你好， 欢迎你来到koa 世界！'
        ctx.cookies.set('test', 'hello world');
        console.log('111111111111111111');
    }, (ctx, next)=> {
        console.log('222222222222222');
        ctx.body = 'hellow world'
        next()
        // ctx.body = 'hello world';
    });
//   let controller = new UserController();
}