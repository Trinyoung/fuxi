/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-12 20:53:18
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 19:24:39
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\base\baseController.ts
 */
// import { User } from '../../models/User';
import { ParameterizedContext } from 'koa';
import { BaseService } from './baseService';
import { BaseInterface } from './baseInterface';
import { Logger } from '../../logger/config';
export class BaseController<T extends BaseService<BaseInterface>>{
    constructor(public service: T) {
        this.service = service;
    }

    public async create(ctx: ParameterizedContext) {
        try {
            const { body } = ctx.request;
            const result = await this.service.createItem(body);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('create error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async delete(ctx: ParameterizedContext) {
        try {
            const { body } = ctx.request;
            const user = ctx.user;
            await this.service.updateItem(body, { is_deleted: 1 });
            return ctx.body = { code: '000', message: '删除成功' };
        } catch (err) {
            Logger.info('update Error:', err.message);
            return ctx.body = { code: '999', err };
        }

    }

    public async getOne(ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.query, ctx.params, ctx.request.body);
            const result = await this.service.getItem(query);
            return ctx.body = {code: '000', data: result};
        } catch (err) {
            Logger.info('get error:', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async getList(ctx: ParameterizedContext) {
        try {
            console.log('get list is here')
            const query = Object.assign({}, ctx.query, ctx.params, ctx.request.body);
            console.log(query, '===========><========query')
            const result = await this.service.getList(query);
            return ctx.body = {code: '000', list: result};
        } catch (err) {
            Logger.info('get List error:', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async getListByPage (ctx: ParameterizedContext) {
        try {
            const params = Object.assign({ page: 1, limit: 10 }, ctx.query, ctx.params, ctx.request.body);
            const query = Object.assign({}, params, { limit: undefined, page: undefined });
            const result = await this.service.getListByPage(query, params.limit, params.page);
            return ctx.body = {code: '000', result};
        } catch (err) {
            Logger.info('getListByPage error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async updateItem(ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.params, ctx.query);
            const condition = Object.assign({}, ctx.request.body);
            const result = await this.service.updateItem(ctx.user._id, condition, query);
            return ctx.body = { code: '000', result }
        } catch (err) {
            Logger.error('update item error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async findOneAndUpdate(ctx: ParameterizedContext) {
        try {
            const query = Object.assign({}, ctx.params, ctx.query);
            const condition = Object.assign({}, ctx.request.body);
            const result = await this.service.findOneAndUpdateItem(ctx.user._id, query, condition);
            return ctx.body = {code: '000', result};
        } catch (err) {
            Logger.error('update item error：', err.message);
            return ctx.body = {code: '999', err}
        }
    }
}    