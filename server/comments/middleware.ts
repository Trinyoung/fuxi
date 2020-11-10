import { Next, ParameterizedContext } from "koa";

export default class CommentMiddleware {
    async commentVisitInfo(ctx: ParameterizedContext, next: Next) {
        await next();
        const { nilName, email } = ctx.request.body;

        if (email) {
            const expireTime = new Date().getTime() + 60 * 60 * 2 * 1000;
            ctx.cookies.set('visitInfo', JSON.stringify({ nilName, email }), { expires: new Date(expireTime), httpOnly: false });
        }
    }
}