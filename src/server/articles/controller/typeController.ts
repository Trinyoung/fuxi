/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-20 08:34:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:10:27
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
    constructor () {
        super(typeService);
    }

    async getListByPage (ctx: ParameterizedContext) {
        try {
            const params = Object.assign({ page: 1, limit: 10 }, ctx.query, ctx.params, ctx.request.body);
            const query = _.omit(params, ['limit', 'page']);
            const populater = {
                path: 'tags',
                select: 'name'
            };
            const result = await this.service.getListByPage(query, Number(params.page), Number(params.limit), '', populater);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('getListByPage error：', err.message);
            ctx.body = { code: '999', err };
        }
    }

    async cascaderForTypes (ctx: ParameterizedContext) {
        try {
            const result = await this.service.getListForTypes({});
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('getListByPage error：', err.message);
            ctx.body = { code: '999', err };
        }
    }

    async getParentTypes (ctx: ParameterizedContext) {
        try {
            const { typeCode, id, withTitle } = ctx.query;
            const result = await this.service.getParentTypes(typeCode, id, Number(withTitle));
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('getParentTypes error:', err.message);
            ctx.body = { code: '999', err: err.message };
        }
    }

    async getTypesTree (ctx: ParameterizedContext) {
        try {
            const query = Object.assign(ctx.query, ctx.params, ctx.request.body);
            const result = await this.service.getTypesTree(query);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('getTypesTree error:', err.message);
            ctx.body = { code: '999', err: err.message };
        }
    }
}
