/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-19 15:57:57
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-22 19:34:00
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\comments\controller\commentController.ts
 */
import { BaseController } from '../../base/baseController';
import { CommentService, commentService } from '../service/commentService';
import { ParameterizedContext } from 'koa';
import { Logger } from '../../../logger/config';
export default class CommentController extends BaseController<CommentService> {
    constructor() {
        super(commentService)
    }
    public async getListForComments(ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.params);
            const uid = ctx.query.uid;
            const result = await this.service.getListForComments(query, uid, true);
            return ctx.body = { code: '000', result: result };
        } catch (err) {
            Logger.info('get List error:', err.message);
            return ctx.body = { code: '999', err };
        }
    }
}