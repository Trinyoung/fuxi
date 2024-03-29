/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:22:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-25 14:44:40
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\app.ts
 */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import route from './router';
import { Logger } from './logger/config';
import * as config from 'config';
const port = process.env.port || config.get('port');
console.log(process.env.NODE_ENV, '环境变量');
const app = new Koa();
const router = new Router(
    {
        prefix: '/api'
    }
);

route(router);
app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.on('err', function (err) {
    Logger.error(err.message);
});

app.listen(port, () => {
    Logger.info(`server is on port: ${port}`);
});
