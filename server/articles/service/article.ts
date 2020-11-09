/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-11 16:27:17
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-19 16:16:57
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\article.ts
 */
import { BaseService } from "../../base/baseService"
import { ArticleModel } from '../models/article_model';
import { ReadModel } from '../models/reader';
import { ArticleInterface, ReadInterface, ArticleTypeInterface, FavoriteInterface } from '../interface';
import { populateInterface } from '../../base/baseInterface';
// import { User } from '../../user/userInterface';
import * as moment from 'moment';
import { FilterQuery, UpdateQuery } from "mongoose";
import { UserSchema } from "../../user/models/user";
import { favoriteModel } from "../models/favorite";
// import { TagModel } from "server/tags/model";
export class ArticleService extends BaseService<ArticleInterface> {
    constructor() {
        super(ArticleModel);
    }

    public async getListByPageForAriticle(query: FilterQuery<ArticleInterface>, page = 1, limit = 10, projection?: string, populate?: string | string[] | populateInterface | populateInterface[]) {
        const result = await this.getListByPage(query, page, limit, projection, populate);
        const InAweek = moment().unix() - (7 * 60 * 60 * 24);
        const InAMonth = moment().unix() - (30 * 60 * 60 * 24);
        const ids = result.docs.map(item => item._id);
        const uids = result.docs.map(item => item.createdBy);
        const reads = await ReadModel.find({ articleId: { $in: ids } });
        const authors = await UserSchema.find({ uid: { $in: uids } }, 'realName uid');
        const authorKeyByUid = authors.reduce((x: any, y) => {
            x[y.uid] = y.realName;
            return x;
        }, {});
        const readsKeyByArticle = reads.reduce((x: any, y: ReadInterface) => {
            if (x[JSON.stringify(y.articleId)]) {
                x[JSON.stringify(y.articleId)].reads++;
            } else {
                x[JSON.stringify(y.articleId)] = {
                    reads: 1,
                    weekView: 0,
                    monthView: 0
                }
            }
            if (y.createdAt > InAweek) {
                x[JSON.stringify(y.articleId)].weekView++;
            }
            if (y.createdAt > InAMonth) {
                x[JSON.stringify(y.articleId)].monthView++;
            }
            return x;
        }, {});
        const favorites = await favoriteModel.find({ articleId: { $in: ids } });
        const favoriteKeyByArticle = favorites.reduce((x: any, y: FavoriteInterface) => {
            if (x[JSON.stringify(y.articleId)]) {
                x[JSON.stringify(y.articleId)].favorites++;
            } else {
                x[JSON.stringify(y.articleId)] = {
                    favorites: 1,
                    weekFavorites: 0,
                    monthFavorites: 0
                }
            }
            if (y.createdAt > InAweek) {
                x[JSON.stringify(y.articleId)].weekFavorites++;
            }
            if (y.createdAt > InAMonth) {
                x[JSON.stringify(y.articleId)].monthFavorites++;
            }
            return x;
        }, {});
        console.log()
        const resArr = result.docs.map(item => {
            const obj: any = Object.assign({}, item);
            obj.isNew = item.createdAt > InAweek;
            obj.hasReads = readsKeyByArticle[JSON.stringify(item._id)] && readsKeyByArticle[JSON.stringify(item._id)].reads || 0;
            obj.favorites = favoriteKeyByArticle[JSON.stringify(item._id)] && favoriteKeyByArticle[JSON.stringify(item._id)].favorites || 0;
            // 是否热门的判断标准是 近一周之内 访问量超过 50, 一个月内超过100； 一周内点赞数超过10， 一个月内超过20；
            const weekFavorites = favoriteKeyByArticle[JSON.stringify(item._id)] && favoriteKeyByArticle[JSON.stringify(item._id)].weekFavorites || 0;
            const monthFavorites = favoriteKeyByArticle[JSON.stringify(item._id)] && favoriteKeyByArticle[JSON.stringify(item._id)].monthFavorites || 0;
            const weekView = readsKeyByArticle[JSON.stringify(item._id)] && readsKeyByArticle[JSON.stringify(item._id)].weekView || 0;
            const monthView = readsKeyByArticle[JSON.stringify(item._id)] && readsKeyByArticle[JSON.stringify(item._id)].weekView || 0;
            obj.isHot = weekFavorites > 10 || monthFavorites > 20 || weekView > 50 || monthView > 100;
            obj.createdBy = authorKeyByUid[item.createdBy];
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

    public async getAticleDetail(query?: FilterQuery<ArticleInterface>, projection?: string, lean = true, populate?: string | populateInterface | [string] | populateInterface[]) {
        const article = await this.getItem(query, projection, lean, populate);
        const createdBy = await UserSchema.findOne({ uid: article.createdBy }, 'realName uid');
        article.hasReads = await ReadModel.countDocuments({ articleId: article._id });
        const res = Object.assign({ favorites: 0, author: createdBy && createdBy.realName, tags: [], wordNums: 0 }, article);
        res.favorites = await favoriteModel.countDocuments({ articleId: article._id });
        res.wordNums = article.content.length
        return res;
    }
}

export const articleService = new ArticleService(); 