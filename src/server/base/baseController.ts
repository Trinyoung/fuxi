/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-12 20:53:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 14:01:30
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\base\baseController.ts
 */
// import { User } from '../../models/User';
import { ParameterizedContext } from 'koa';
import { BaseService } from './baseService';
import { BaseInterface } from './baseInterface';
import { Logger } from '../../logger/config';
export class BaseController<T extends BaseService<BaseInterface>> {
    constructor (public service: T) {
        this.service = service;
    }

    public async create (ctx: ParameterizedContext) {
        try {
            const { body } = ctx.request;
            const result = await this.service.createItem(body);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('create error：', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async delete (ctx: ParameterizedContext) {
        try {
            const { body } = ctx.request;
            // const user = ctx.user;
            await this.service.updateItem(body, { is_deleted: 1 });
            ctx.body = { code: '000', result: '删除成功' };
        } catch (err) {
            Logger.error('update Error:', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async getOne (ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.query, ctx.params, ctx.request.body);
            console.log(query, '------------------------->');
            const result = await this.service.getItem(query);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('get error:', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async getList (ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.query, ctx.params, ctx.request.body);
            const result = await this.service.getList(query);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('get List error:', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async getListByPage (ctx: ParameterizedContext) {
        try {
            const params = Object.assign({ page: 1, limit: 10 }, ctx.query, ctx.params, ctx.request.body);
            const query = Object.assign({}, params, { limit: undefined, page: undefined });
            const result = await this.service.getListByPage(query, params.limit, params.page);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('getListByPage error：', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async updateItem (ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.params, ctx.query);
            const condition = Object.assign({}, ctx.request.body);
            const result = await this.service.updateItem(ctx.user._id, condition, query);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('update item error：', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async findOneAndUpdate (ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.params, ctx.query);
            const condition = Object.assign({}, ctx.request.body);
            const result = await this.service.findOneAndUpdateItem(ctx.user._id, query, condition);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('update item error：', err.message);
            ctx.body = { code: '999', err };
        }
    }
}
