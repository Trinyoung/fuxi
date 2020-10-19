import { ParameterizedContext } from 'koa';
import { BaseController } from '../../base/baseController';
import { TypeService, typeService } from '../service/type';
import { Logger } from '../../../logger/config';
import * as _ from 'lodash';

export default class TypeController extends BaseController<TypeService> {
    constructor() {
        super(typeService);
    }

    async getListByPage (ctx: ParameterizedContext) {
        try {
            const params = Object.assign({ page: 1, limit: 10 }, ctx.query, ctx.params, ctx.request.body);
            // const query = Object.assign({}, params, { limit: undefined, page: undefined });
            const query = _.omit(params, ['limit', 'page'])
            const populater = {
                path: 'tags',
                select: 'name'
            };
            const result = await this.service.getListByPage(query, Number(params.page), Number(params.limit),  '', populater);
            return ctx.body = {code: '000', result};
        } catch (err) {
            Logger.info('getListByPage error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }
}