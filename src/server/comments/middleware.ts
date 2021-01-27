/*
 * @Author: your name
 * @Date: 2020-11-11 08:49:45
 * @LastEditTime: 2020-11-26 17:33:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edito
 * @FilePath: \fuxi\server\comments\middleware.ts
 */
import { Next, ParameterizedContext } from "koa";
import { commentModel } from './models/commentModel';
import { Logger } from '../../logger/config';

export default class CommentMiddleware {
    async commentVisitInfo(ctx: ParameterizedContext, next: Next) {
        await next();
        const { nilName, email } = ctx.request.body;

        if (email) {
            const expireTime = new Date().getTime() + 60 * 60 * 2 * 1000;
            // 游客评论信息保存！
            ctx.cookies.set('visitInfo', JSON.stringify({ nilName, email }), { expires: new Date(expireTime), httpOnly: false });
        }
    }

    async addCommentFavoriteNum (ctx: ParameterizedContext, next: Next) {
        await next();
        const { commentId } = ctx.request.body;
        try {
            const result = await commentModel.findOneAndUpdate({_id: commentId}, {$inc: { favoriteNum: 1}}, {new: true});
            ctx.body = {code: '000', result: result.favoriteNum }
        } catch (err) {
            Logger.info('get List error:', err.message);
            ctx.body = {code: '999', err };
        }
        
    }
}