/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:13:26
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\article.ts
 */
import { BaseService } from "../../base/baseService"
import { ArticleModel } from '../models/article_model';
import { ReadModel } from '../models/reader';
import { ArticleInterface, ReadInterface, ArticleTypeInterface } from '../interface';
import { populateInterface } from '../../base/baseInterface';
import { User } from '../../user/userInterface';
import * as moment from 'moment';
import { FilterQuery, UpdateQuery } from "mongoose";
export class ArticleService extends BaseService<ArticleInterface> {
    constructor() {
        super(ArticleModel);
    }

    public async publish(user: User, query: FilterQuery<ArticleInterface>, condition: UpdateQuery<ArticleInterface>) { // 文章发布
        const option = { upsert: true, new: true };
        condition = Object.assign(condition, { updatedBy: user.uid, createdBy: user.uid, updatedAt: moment().unix() });
        const article = await this.findOneAndUpdateItem(user.uid, query, condition, option);
        return article;
    }

    // 包括创建和更新文章
    public async submit(user: User, query: FilterQuery<ArticleInterface>, condition: UpdateQuery<ArticleInterface>) {
        const option = { upsert: true, new: true };
        const article = await this.findOneAndUpdateItem(user.uid, query, condition, option);
        return article;
    }

    public async getListByPageForAriticle(query: FilterQuery<ArticleInterface>, page = 1, limit = 10, projection?: string, populate?: string | string[] | populateInterface | populateInterface[]) {
        const result = await this.getListByPage(query, page, limit, projection, populate);
        const InAweek = moment().unix() - (7 * 60 * 60 * 24);
        const InAMonth = moment().unix() - (30 * 60 * 60 * 24);
        const ids = result.docs.map(item => item._id);
        const reads = await ReadModel.find({ _id: { $in: ids } });
        const readsKeyByArticle = reads.reduce((x:any, y:ReadInterface) => {
            if (x[JSON.stringify(y.articleId)]) {
                x[y._id].reads ++
            } else {
                x[JSON.stringify(y.articleId)] = {
                    reads: 1,
                    weekView: 0,
                    monthView: 0
                }
            }
            if (y.createdAt > InAweek) {
                x[JSON.stringify(y.articleId)].weekView ++;
            }
            if (y.createdAt > InAMonth) {
                x[JSON.stringify(y.articleId)].monthView ++;
            }
            return x;
        }, {});
        const resArr = result.docs.map(item => {
            const obj: any = Object.assign({}, item);
            obj.favorites = item.favorites.length;
            obj.isNew = item.createdAt > InAweek;
            // 是否热门的判断标准是 近一周之内 访问量超过 50, 一个月内超过100； 一周内点赞数超过10， 一个月内超过20；
            const weekFavorites = item.favorites.filter(item => item.createdAt > InAweek).length;
            const monthFavorites = item.favorites.filter(item => item.createdAt > InAMonth).length;
            const readObj = readsKeyByArticle[JSON.stringify(item._id)];
            obj.isHot = weekFavorites > 10 || monthFavorites > 20 || readObj && readObj.weekView > 50 || readObj.monthView > 100;
            if (readObj) {
                obj.hasReads = readObj.reads;
            }
            return obj;
        });
        return {
            docs: resArr,
            pages: result.pages,
            total: result.total,
            limit: result.limit,
            page: result.page
        }
    }

    // public async getListByPageFor
    public async getListByPageForTypes(query: FilterQuery<ArticleTypeInterface>, page = 1, limit = 10) {
        const articleList = await this.getListByPage
    }
}

export const articleService = new ArticleService(); 