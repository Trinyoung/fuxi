import { Next, ParameterizedContext } from "koa";
import { commentModel } from './models/commentModel';
import { Logger } from '../../logger/config';

export default class CommentMiddleware {
    async commentVisitInfo(ctx: ParameterizedContext, next: Next) {
        await next();
        const { nilName, email } = ctx.request.body;

        if (email) {
            const expireTime = new Date().getTime() + 60 * 60 * 2 * 1000;
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
            ctx.body = {}
        }
        
    }
}