/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 17:04:36
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\controller\articleController.ts
 */
import { BaseController } from '../../base/baseController';
import { ArticleService, articleService } from '../service/article';
import { ParameterizedContext } from 'koa';
import { Logger } from '../../../logger/config';
import { populateInterface } from '../../base/baseInterface';
import { FilterQuery } from 'mongoose';
import { ArticleInterface } from '../interface';
export default class ArticleController extends BaseController<ArticleService> {
    constructor() {
        super(articleService);
    }

    public async getOne(ctx: ParameterizedContext) {
        try {
            const _id = ctx.params.id
            let populater: populateInterface[] = [
                {
                    path: 'createdBy',
                    select: 'realName uid',
                },
                {
                    path: 'articleType',
                    select: 'title typeCode'
                }
            ];
            let projection = 'createdBy content_html updatedBy title type createdAt updatedAt isMarkdown tags refers'
            if (ctx.query.console) {
                projection += ' content isPublic '
            }
            const result = await this.service.getItem({ _id }, projection, true, populater);
            return ctx.body = { code: '000', data: result };
        } catch (err) {
            Logger.info('get error:', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async publish(ctx: ParameterizedContext) {
        try {
            const _id = ctx.params.id;
            const query = { _id };
            const user = ctx.user;
            const condition = ctx.request.body;
            const result = await this.service.publish(user, query, condition);
            return ctx.body = { code: '000', data: result };
        } catch (err) {
            Logger.info('publish error：', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async getListByPage(ctx: ParameterizedContext) {
        try {
            const { page, limit, type, category, keyword } = ctx.query;
            let query: FilterQuery<ArticleInterface>;
            if (type) {
                query.type = type;
            }
            if (category) {
                query.category = category;
            }
            const projection = '';
            let populater: populateInterface[] = [
                {
                    path: 'createdBy',
                    select: 'realName uid',
                },
                {
                    path: 'articleType',
                    select: 'title typeCode'
                }
            ];
            const result = await this.service.getListByPage(query, limit, page, projection, populater);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.info('获取文章列表失败', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async setFavorite(ctx: ParameterizedContext) {

    }

    public async getListByPageForAriticle (ctx: ParameterizedContext) {
        try {
            const { page, limit, type, category, keyword } = ctx.query;
            let query: FilterQuery<ArticleInterface>;
            if (type) {
                query.type = type;
            }
            if (category) {
                query.category = category;
            }
            const projection = '';
            let populater: populateInterface[] = [
                {
                    path: 'createdBy',
                    select: 'realName uid',
                },
                {
                    path: 'articleType',
                    select: 'title typeCode'
                }
            ];
            const result = await this.service.getListByPage(query, limit, page, projection, populater);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.info('获取文章列表失败', err.message);
            return ctx.body = { code: '999', err };
        }
    }
}