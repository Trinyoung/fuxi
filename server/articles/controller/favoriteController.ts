/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 11:14:30
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 19:32:13
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\controller\favoriteController.ts
 */
import { BaseController } from '../../base/baseController';
import { FavoriteService, favoriteService } from '../service/favorite';
import { ParameterizedContext } from 'koa';
import { Logger } from '../../../logger/config';
export default class FavoriteController extends BaseController<FavoriteService> {
    constructor() {
        super(favoriteService);
    }

    public async getNums(ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.request.body, ctx.query);
            const result = await this.service.getNums(query);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error(`点赞计数出错:${err}`);
            return ctx.body = { code: '999', err };
        }
    }
}