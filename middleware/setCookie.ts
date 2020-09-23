/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 19:33:37
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 19:49:16
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\middleware\setCookie.ts
 */
import { Next, ParameterizedContext } from 'koa'
export async function setFavoriteCookie(ctx: ParameterizedContext, next: Next) {
    await next();
    const id = ctx.body.result._id;
    const now = new Date().getTime();
    ctx.cookies.set(`favorite-${id}`, id, { expires: new Date(now + 15 * 60 * 1000) });
}

export async function deleteFavoriteCookie(ctx: ParameterizedContext, next: Next) {
    await next();
    const id = ctx.params.id;
    ctx.cookies.set(`favorite-${id}`, id, {maxAge: 0});
}