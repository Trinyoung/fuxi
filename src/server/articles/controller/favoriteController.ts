/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 11:14:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:10:19
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\controller\favoriteController.ts
 */
import { BaseController } from '../../base/baseController';
import { FavoriteService, favoriteService } from '../service/favorite';
import { ParameterizedContext } from 'koa';
import { Logger } from '../../../logger/config';
export default class FavoriteController extends BaseController<FavoriteService> {
    constructor () {
        super(favoriteService);
    }

    public async getNums (ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.request.body, ctx.query);
            const result = await this.service.getNums(query);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error(`点赞计数出错:${err}`);
            ctx.body = { code: '999', err };
        }
    }
}
