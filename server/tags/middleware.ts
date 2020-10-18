import { Next, ParameterizedContext } from "koa";

import cacheHelper from '../../cacheHelper';
export async function getTagsFromCache(ctx: ParameterizedContext, next: Next) {
    let tagkey = ctx.cookies.get('tagKey');
    if (tagkey) {
        const result = await new Promise((resolve, reject) => {
            cacheHelper.get('tags', tagkey, (res) => {
                if (!res) {
                    resolve(res)
                }
            })
        });
        if (result) {
            console.log('here is cache')
            return ctx.body = {code: '000', list: result}
        }
    }
    await next()
    const now = new Date().getTime()
    const expireTime = now + 1000 * 60 * 60 * 48;
    ctx.cookies.set('tagKey', 'luqingyang', {expires: new Date(expireTime), httpOnly: true});
    tagkey = ctx.cookies.get('tagKey');
    cacheHelper.put('tags', tagkey, ctx.body.list, res => {
        console.log(res, '---------------->')
    });
};

