import { Next, ParameterizedContext } from "koa";

import cacheHelper from '../../cacheHelper';
export async function getTagsFromCache(ctx: ParameterizedContext, next: Next) {
    const result = await new Promise((resolve, reject) => {
        cacheHelper.get('tags', tagkey, (res) => {
            if (!res) {
                resolve(res)
            }
        })
    });
    if (result) {
        return ctx.body = {code: '000', list: result}
    }
    await next()
    const now = new Date().getTime()
    const expireTime = now + 1000 * 60 * 60 * 48;
    ctx.cookies.set('tagKey', 'luqingyang', {expires: new Date(expireTime), httpOnly: true});
    const tagkey = ctx.cookies.get('tagKey')
    cacheHelper.put('tags', tagkey, ctx.body.list)
};
