import { BaseService } from "../../base/baseService"
import { ArticleModel } from '../models/article_model';
import { ReadModel } from '../models/reader';
import { ArticleInterface, ArticleBaseInterface } from '../interface';
import { populateInterface } from '../../base/baseInterface';
import * as moment from 'moment';
import { FilterQuery } from "mongoose";
import { UserSchema } from "../../user/models/user";
import { favoriteModel } from "../models/favorite";
import { commentModel } from "../../comments/models/commentModel";
export class ArticleService extends BaseService<ArticleInterface> {
    constructor() {
        super(ArticleModel);
    }

    public async getListByPageForAriticle(query: FilterQuery<ArticleInterface>, page = 1, limit = 10, projection?: string, populate?: string | string[] | populateInterface | populateInterface[]) {
        const result = await this.getListByPage(query, page, limit, projection, populate);
        const InAweek = moment().subtract(1, 'week').unix();
        const ids = result.docs.map(item => item._id);
        const uids = result.docs.map(item => item.createdBy);
        const authors = await UserSchema.find({ uid: { $in: uids } }, 'realName uid');
        const authorKeyByUid = authors.reduce((x: any, y) => {
            x[y.uid] = y.realName;
            return x;
        }, {});
        const [readsKeyByArticle, favoriteKeyByArticle, commentKeyByArticle] = await Promise.all([
            ReadModel.find({ articleId: { $in: ids } }).then(res => { return Promise.resolve(this.objKeyByArticle(res)) }),
            favoriteModel.find({ articleId: { $in: ids } }).then(res => { return Promise.resolve(this.objKeyByArticle(res)) }),
            commentModel.find({ articleId: { $in: ids } }).then(res => { return Promise.resolve(this.objKeyByArticle(res)) })
        ]);
        const resArr = result.docs.map(item => {
            const readsObj = Object.assign({ total: 0, weekNums: 0, monthNums: 0 }, readsKeyByArticle[JSON.stringify(item._id)]);
            const favoriteObj = Object.assign({ total: 0, weekNums: 0, monthNums: 0 }, favoriteKeyByArticle[JSON.stringify(item._id)]);
            const commentObj = Object.assign({ total: 0, weekNums: 0, monthNums: 0 }, commentKeyByArticle[JSON.stringify(item._id)]);
            return Object.assign(item, {
                hasReads: readsObj.total,
                favorites: favoriteObj.total,
                comments: commentObj.total,
                createdBy: authorKeyByUid[item.createdBy],
                isNew: item.createdAt > InAweek,
                isHot: (readsObj.weekNums + favoriteObj.weekNums * 2 + commentObj.weekNums * 2) > 100 ||
                    (readsObj.monthNums + favoriteObj.monthNums * 2 + commentObj.monthNums * 2) > 200
            });
        });
        return Object.assign({ docs: resArr }, result);
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

    public async getHotAticles(authorUid: string) {
        // 排列的顺序是 热度值高的排前;
        const [favorites, reads, comments] = await Promise.all([
            favoriteModel.aggregate([
                { $match: { is_deleted: 0, authorUid, createdAt: { $gt: moment().subtract(1, 'M').unix() } } },
                { $group: { _id: '$articleId', createdAt: { $push: '$createdAt' }, total: { $sum: 2 } } },
                {
                    $lookup: {
                        from: 'articles',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'articleInfo'
                    }
                },
                { $unwind: '$articleInfo' },
                {
                    $project: {
                        'articleInfo.title': 1,
                        'articleInfo.createdBy': 1,
                        createdAt: 1,
                        total: 1
                    }
                }
            ]).then(res => { return Promise.resolve(this.hotItemKeyByArticle(res)) }),
            ReadModel.aggregate([
                { $match: { is_deleted: 0, authorUid, createdAt: { $gt: moment().subtract(1, 'M').unix() } } },
                { $group: { _id: '$articleId', createdAt: { $push: '$createdAt' }, total: { $sum: 1 } } },
                {
                    $lookup: {
                        from: 'articles',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'articleInfo'
                    }
                },
                { $unwind: '$articleInfo' },
                {
                    $project: {
                        'articleInfo.title': 1,
                        'articleInfo.createdBy': 1,
                        createdAt: 1,
                        total: 1
                    }
                }
            ]).then(res => { return Promise.resolve(this.hotItemKeyByArticle(res)) }),
            commentModel.aggregate([
                { $match: { is_deleted: 0, authorUid, createdAt: { $gt: moment().subtract(1, 'M').unix() } } },
                { $group: { _id: '$articleId', createdAt: { $push: '$createdAt' }, total: { $sum: 2 } } },
                {
                    $lookup: {
                        from: 'articles',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'articleInfo'
                    }
                },
                { $unwind: '$articleInfo' },
                {
                    $project: {
                        'articleInfo.title': 1,
                        'articleInfo.createdBy': 1,
                        createdAt: 1,
                        total: 1
                    }
                }
            ]).then(res => { return Promise.resolve(this.hotItemKeyByArticle(res)) })
        ]);
        for (let key in favorites) {
            
        }
        return { favorites, reads, comments };
    }

    public async getNewArticles(createdBy: string, page: number, limit: number, projection: string) {
        this.getListByPage({ createdBy, is_deleted: 0 }, page, limit, projection, null, { createdAt: -1 });
    }
    private objKeyByArticle<T extends ArticleBaseInterface>(arr: T[]) {
        const InAweek = moment().subtract(1, 'week').unix();
        const InAMonth = moment().subtract(1, "M").unix();
        return arr.reduce((x: any, y: T) => {
            if (x[JSON.stringify(y.articleId)]) {
                x[JSON.stringify(y.articleId)].total++;
            } else {
                x[JSON.stringify(y.articleId)] = {
                    total: 1,
                    weekNums: 0,
                    monthNums: 0
                }
            }
            if (y.createdAt > InAweek) {
                x[JSON.stringify(y.articleId)].weekNums++;
            }
            if (y.createdAt > InAMonth) {
                x[JSON.stringify(y.articleId)].monthNums++;
            }
            return x;
        }, {});
    }
    private hotItemKeyByArticle (arr:any[]) {
        return arr.reduce((x:any, y:any) => {
            x[JSON.stringify(y._id)] = y;
            return x;
        }, {})
    }
    public async getArticleNums(createdBy: string) {
        const articleNums = await this.model.countDocuments({ is_deleted: 0, createdBy });
        const readsNums = await ReadModel.countDocuments({ is_deleted: 0, authorUid: createdBy });
        const favoriteNums = await favoriteModel.countDocuments({ is_deleted: 0, authorUid: createdBy });
        return { articleNums, readsNums, favoriteNums };
    }
}

export const articleService = new ArticleService(); 