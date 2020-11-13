/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-05 18:45:01
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
    populater: populateInterface[]
    constructor() {
        super(articleService);
        this.populater = [
            {
                path: 'type',
                select: 'title typeCode'
            },
            {
                path: 'tags',
                select: 'name'
            }
        ]
    }

    public async getOne(ctx: ParameterizedContext) {
        try {
            const _id = ctx.params.id
            let projection = 'createdBy content_html updatedBy title type createdAt updatedAt isMarkdown tags refers content'
            if (ctx.query.console) {
                projection += ' content isPublic '
            }
            const result = await this.service.getAticleDetail({ _id }, projection, true, this.populater);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('get error:', err.message);
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
            const result = await this.service.getListByPageForAriticle(query, Number(page), limit, projection, this.populater);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('获取文章列表失败', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async getListByPageForAriticle(ctx: ParameterizedContext) {
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
                    path: 'type',
                    select: 'title typeCode'
                }
            ];
            const result = await this.service.getListByPageForAriticle(query, page, limit, projection, populater);
            return ctx.body = { code: '000', result };
        } catch (err) {
            Logger.info('获取文章列表失败', err.message);
            return ctx.body = { code: '999', err };
        }
    }

    public async getArticleNums(ctx: ParameterizedContext) {
        try {
            const { createdBy } = ctx.query
            const result = await this.service.getArticleNums(createdBy);
            return ctx.body = { code: '000', result }
        } catch (err) {
            Logger.error('获取文章数量失败', err.message)
            return ctx.body = {code: '999', message: err.message}
        }
    }
}