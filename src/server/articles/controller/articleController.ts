/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-01 15:17:26
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
import { ArticleInterface, category } from '../interface';
export default class ArticleController extends BaseController<ArticleService> {
    populater: populateInterface[]
    constructor () {
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
        ];
    }

    public async getOne (ctx: ParameterizedContext) {
        try {
            const _id = ctx.params.id;
            let projection = 'createdBy content_html updatedBy title type createdAt updatedAt isMarkdown tags refers content';
            if (ctx.query.console) {
                projection += ' content isPublic ';
            }
            const result = await this.service.getAticleDetail({ _id }, projection, true, this.populater);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('get error:', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async getListByPage (ctx: ParameterizedContext) {
        try {
            const { page, limit, category } = ctx.query;
            let query: FilterQuery<ArticleInterface>;
            if (ctx.query.type) {
                query.type = ctx.query.type as string;
            }
            if (category) {
                query.category = Number(category) as category;
            }
            const projection = '';
            const result = await this.service.getListByPageForAriticle(query, Number(page), Number(limit), projection, this.populater);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('获取文章列表失败', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async getListByPageForAriticle (ctx: ParameterizedContext) {
        try {
            const { page, limit, category, createdBy } = ctx.query;
            const query: FilterQuery<ArticleInterface> = {};
            if (ctx.query.type) {
                query.type = ctx.query.type as string;
            }
            if (category) {
                query.category = Number(category) as category;
            }
            if (createdBy) {
                query.createdBy = createdBy as string;
            }
            const projection = '';
            const populater: populateInterface[] = [
                {
                    path: 'author',
                    select: 'realName username uid'
                },
                {
                    path: 'type',
                    select: 'title typeCode'
                }
            ];
            const result = await this.service.getListByPageForAriticle(query, Number(page), Number(limit), projection, populater);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.info('获取文章列表失败', err.message);
            ctx.body = { code: '999', err };
        }
    }

    public async getArticleNums (ctx: ParameterizedContext) {
        try {
            // const { createdBy } = ctx.query;
            const result = await this.service.getArticleNums(ctx.query.createdBy as string);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('获取文章数量失败', err.message);
            ctx.body = { code: '999', message: err.message };
        }
    }

    public async getHotArticles (ctx: ParameterizedContext) {
        try {
            const authorUid = ctx.query.authorUid as string;
            const result = await this.service.getHotAticles(authorUid);
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('获取热门文章失败', err.message);
            ctx.body = { code: '999', message: err.message };
        }
    }

    public async getNewArticles (ctx: ParameterizedContext) {
        try {
            const result = await this.service.getNewArticles(ctx.query.createdBy as string, 1, 5, 'title createdBy createdAt');
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('获取最新文章失败', err.message);
            ctx.body = { code: '000', message: err.message };
        }
    }

    public async getHotAuthors (ctx: ParameterizedContext) {
        try {
            const result = await this.service.getHotAuthors();
            ctx.body = { code: '000', result };
        } catch (err) {
            Logger.error('获取热门作者失败', err.message);
            ctx.body = { code: '000', message: err.message };
        }
    }
}
