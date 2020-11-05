/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-20 08:34:43
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-20 10:49:43
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\controller\typeController.ts
 */
import { ParameterizedContext } from 'koa';
import { BaseController } from '../../base/baseController';
import { TypeService, typeService } from '../service/type';
import { Logger } from '../../../logger/config';
import * as _ from 'lodash';

export default class TypeController extends BaseController<TypeService> {
    constructor() {
        super(typeService);
    }

    async getListByPage(ctx: ParameterizedContext) {
        try {
            const params = Object.assign({ page: 1, limit: 10 }, ctx.query, ctx.params, ctx.request.body);
            // const query = Object.assign({}, params, { limit: undefined, page: undefined });
            const query = _.omit(params, ['limit', 'page'])
            const populater = {
                path: 'tags',
                select: 'name'
            };
            const result = await this.service.getListByPage(query, Number(params.page), Number(params.limit), '', populater);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.info('getListByPage error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    async cascaderForTypes(ctx: ParameterizedContext) {
        try {
            const result = await this.service.getListForTypes({});
            return ctx.body = { code: '000', result }
        } catch (err) {
            Logger.info('getListByPage error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    async getParentTypes(ctx: ParameterizedContext) {
        try {
            const typeCode = ctx.query.typeCode;
            const result = await this.service.getParentTypes(typeCode);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.info('getParentTypes error:', err.message);
            return ctx.body = { code: '999', err};
        }
    }
}