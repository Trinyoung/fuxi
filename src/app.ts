/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:22:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-30 09:14:01
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\app.ts
 */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import route from './router';
import { Logger } from './logger/config';

const app = new Koa();
const router =  new Router(
	{
		prefix: '/api'
	}
);

route(router);
app
	.use(bodyParser())
	.use(router.routes())
	.use(router.allowedMethods())
	

app.on('err', function (err) {
	Logger.error(err.message);
});

app.listen(9221, () => {
    Logger.info('server is on port: 9221');
});

