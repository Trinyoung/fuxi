/*
 * @Author: your name
 * @Date: 2020-11-23 13:28:36
 * @LastEditTime: 2020-11-23 13:44:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\server\articles\middleware.ts
 */
import { Next, ParameterizedContext } from 'koa';
// import { ReadModel } from './models/reader';
// import { favoriteModel } from './models/favorite';
import { ArticleModel } from './models/article_model';
import { Logger } from '../../logger/config';

export default class ArticleMiddleware {
    async setFavoriteMiddleware (ctx: ParameterizedContext, next: Next) {
        await next();
        try {
            const { articleId } = ctx.request.body;
            const result = await ArticleModel.findOneAndUpdate({ _id: articleId }, { $inc: { favoriteNums: 1 } }, { new: true });
            ctx.body = { code: '000', result: result.favoriteNums };
        } catch (err) {
            Logger.error(err);
            ctx.body = { code: '999', err };
        }
    }

    async setReadMiddleware (ctx: ParameterizedContext, next: Next) {
        await next();
        try {
            const { articleId } = ctx.request.body;
            const result = await ArticleModel.findOneAndUpdate({ _id: articleId }, { $inc: { hasReads: 1 } }, { new: true });
            ctx.body = { code: '000', result: result.hasReads };
        } catch (err) {
            Logger.error(err);
            ctx.body = { code: '999', err };
        }
    }
}
