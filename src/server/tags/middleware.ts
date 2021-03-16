/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-19 15:57:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-16 09:23:50
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\tags\middleware.ts
 */
import { Next, ParameterizedContext } from 'koa';
import { Logger } from '../../logger/config';

import cacheHelper from '../../cacheHelper';
export async function getTagsFromCache(ctx: ParameterizedContext, next: Next) {
    let tagkey = ctx.cookies.get('tagKey');
    if (tagkey) {
        const result:any = await new Promise((resolve, reject) => {
            cacheHelper.get('tags', tagkey, (err, result) => {
                if (err) {
                    Logger.info('获取token失败', err);
                    return;
                }
                if (!result) {
                    return resolve(null);
                }
                // Logger.info('获取用户信息成功', result);
                return resolve(JSON.parse(decodeURIComponent(result)));
            });
        });
        if (result) {
            ctx.body = { code: '000', list: result };
            return;
        }
    }
    await next();
    const now = new Date().getTime();
    const expireTime = now + 1000 * 60 * 60 * 48;
    ctx.cookies.set('tagKey', 'luqingyang', { expires: new Date(expireTime), httpOnly: true });
    tagkey = ctx.cookies.get('tagKey');
    const { list } = ctx.body as any;
    cacheHelper.put('tags', tagkey, list, (res) => {
        console.log(res, '---------------->')
    });
};
