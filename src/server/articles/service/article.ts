import { BaseService } from '../../base/baseService';
import { ArticleModel } from '../models/article_model';
import { ReadModel } from '../models/reader';
import { ArticleInterface, ArticleBaseInterface } from '../interface';
import { populateInterface } from '../../base/baseInterface';
import * as moment from 'moment';
import { FilterQuery, Schema } from 'mongoose';
import { UserSchema } from '../../user/models/user';
// import { UserSchema } from 'user/models/user';
import { favoriteModel } from '../models/favorite';
import { commentModel } from '../../comments/models/commentModel';
import { marked } from 'marked';

export class ArticleService extends BaseService<ArticleInterface> {
    constructor () {
        super(ArticleModel);
    }

    public async getListByPageForAriticle (query: FilterQuery<ArticleInterface>, page = 1, limit = 10, projection?: string, populate?: string | string[] | populateInterface | populateInterface[]) {
        const result = await this.getListByPage(query, page, limit, projection, populate, { createdAt: -1 });
        const InAweek = moment().subtract(1, 'week').unix();
        const ids = result.docs.map(item => item._id);
        const [readsKeyByArticle, favoriteKeyByArticle, commentKeyByArticle] = await Promise.all([
            ReadModel.find({ articleId: { $in: ids } }).then((res:any) => { return Promise.resolve(this.objKeyByArticle(res)); }),
            favoriteModel.find({ articleId: { $in: ids } }).then((res:any) => { return Promise.resolve(this.objKeyByArticle(res)); }),
            commentModel.find({ articleId: { $in: ids } }).then((res:any) => { return Promise.resolve(this.objKeyByArticle(res)); })
        ]);
        const resArr = result.docs.map(item => {
            const readsObj = Object.assign({ total: 0, weekNums: 0, monthNums: 0 }, readsKeyByArticle[JSON.stringify(item._id)]);
            const favoriteObj = Object.assign({ total: 0, weekNums: 0, monthNums: 0 }, favoriteKeyByArticle[JSON.stringify(item._id)]);
            const commentObj = Object.assign({ total: 0, weekNums: 0, monthNums: 0 }, commentKeyByArticle[JSON.stringify(item._id)]);
            return Object.assign(item, {
                content: marked.parse(item.content),
                hasReads: readsObj.total,
                favorites: favoriteObj.total,
                comments: commentObj.total,
                isNew: item.createdAt > InAweek,
                isHot: (readsObj.weekNums + favoriteObj.weekNums * 2 + commentObj.weekNums * 2 + readsObj.monthNums * 0.5 + favoriteObj.monthNums * 1.5 + commentObj.monthNums * 1.5) > 150
            });
        });
        return Object.assign({ docs: resArr }, result);
    }

    public async getAticleDetail (query?: FilterQuery<ArticleInterface>, projection?: string, lean = true, populate?: string | populateInterface | [string] | populateInterface[]) {
        const article = await this.getItem(query, projection, lean, populate);
        const createdBy = await UserSchema.findOne({ uid: article.createdBy }, 'realName uid');
        article.hasReads = await ReadModel.countDocuments({ articleId: article._id });
        const res = Object.assign({ favorites: 0, author: createdBy && createdBy.realName, tags: [], wordNums: 0 }, article);
        res.favorites = await favoriteModel.countDocuments({ articleId: article._id });
        res.wordNums = article.content.length;
        return res;
    }

    public async getHotAticles (authorUid?: string) {
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
                        'articleInfo.createdAt': 1,
                        createdAt: 1,
                        total: 1
                    }
                }
            ]).then(res => { return this.hotItemKeyByArticle(res); }),
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
                        'articleInfo.createdAt': 1,
                        createdAt: 1,
                        total: 1
                    }
                }
            ]).then(res => { return this.hotItemKeyByArticle(res); }),
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
                        'articleInfo.createdAt': 1,
                        createdAt: 1,
                        total: 1
                    }
                }
            ]).then(res => { return this.hotItemKeyByArticle(res); })
        ]);
        let result: {
            hotPoint: number,
            _id: Schema.Types.ObjectId,
            title: string,
            authorUid: string,
            createdAt: number
        }[] = [];
        const InAweek = moment().subtract(1, 'w').unix();
        const InAMonth = moment().subtract(1, 'M').unix();
        for (const key in reads) {
            let [readPoint, favoritePoint, commentPoint] = [0, 0, 0];
            reads[key].createdAt.forEach((item: number) => {
                if (item > InAweek) {
                    readPoint++;
                }
                if (item > InAMonth && item < InAweek) {
                    readPoint++;
                }
            });
            if (favorites[key]) {
                favorites[key].createdAt.forEach((item: number) => {
                    if (item > InAweek) {
                        favoritePoint += 2;
                    }
                    if (item > InAMonth && item < InAweek) {
                        favoritePoint++;
                    }
                });
            }
            if (comments[key]) {
                comments[key].createdAt.forEach((item: number) => {
                    if (item > InAweek) {
                        commentPoint++;
                    }
                    if (item > InAMonth && item < InAweek) {
                        commentPoint++;
                    }
                });
            }
            const hotPoint = readPoint + favoritePoint + commentPoint;
            for (let i = 0; i < 5; i++) {
                if (!result[i]) {
                    result.push({
                        hotPoint,
                        _id: reads[key]._id,
                        title: reads[key].articleInfo.title,
                        authorUid: reads[key].articleInfo.createdBy,
                        createdAt: reads[key].articleInfo.createdAt
                    });
                    break;
                }
                if (hotPoint > result[i].hotPoint) {
                    const splitArr = result.splice(i, result.length - i, {
                        hotPoint,
                        _id: reads[key]._id,
                        title: reads[key].articleInfo.title,
                        authorUid: reads[key].articleInfo.createdBy,
                        createdAt: reads[key].articleInfo.createdAt
                    });
                    result = result.concat(splitArr);
                    if (result.length > 5) {
                        result.pop();
                    }
                    break;
                }
            }
        }
        return result;
    }

    public async getNewArticles (createdBy: string, page: number, limit: number, projection: string) {
        return await this.getListByPage({ createdBy, is_deleted: 0 }, page, limit, projection, null, { createdAt: -1 });
    }

    private objKeyByArticle<T extends ArticleBaseInterface> (arr: T[]) {
        const InAweek = moment().subtract(1, 'week').unix();
        const InAMonth = moment().subtract(1, 'M').unix();
        return arr.reduce((x: any, y: T) => {
            if (x[JSON.stringify(y.articleId)]) {
                x[JSON.stringify(y.articleId)].total++;
            } else {
                x[JSON.stringify(y.articleId)] = {
                    total: 1,
                    weekNums: 0,
                    monthNums: 0
                };
            }
            if (y.createdAt > InAweek) {
                x[JSON.stringify(y.articleId)].weekNums++;
            }
            if (y.createdAt > InAMonth && y.createdAt < InAweek) {
                x[JSON.stringify(y.articleId)].monthNums++;
            }
            return x;
        }, {});
    }

    private hotItemKeyByArticle (arr: any[]) {
        return arr.reduce((x: any, y: any) => {
            x[JSON.stringify(y._id)] = y;
            return x;
        }, {});
    }

    public async getArticleNums (createdBy: string) {
        const articleNums = await this.model.countDocuments({ is_deleted: 0, createdBy });
        const readsNums = await ReadModel.countDocuments({ is_deleted: 0, authorUid: createdBy });
        const favoriteNums = await favoriteModel.countDocuments({ is_deleted: 0, authorUid: createdBy });
        return { articleNums, readsNums, favoriteNums };
    }

    public async getHotAuthors () {
        const result = await this.model.aggregate([
            { $match: { is_deleted: 0 } },
            { $group: { _id: '$createdBy', favoriteNums: { $sum: '$favoriteNums' }, readNums: { $sum: '$hasReads' }, articleNums: { $sum: 1 } } },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: 'uid',
                    as: 'userInfo'
                }
            },
            {
                $unwind: '$userInfo'
            },
            {
                $project: {
                    'userInfo.username': 1,
                    favoriteNums: 1,
                    readNums: 1,
                    articleNums: 1
                }
            },
            {
                $sort: {
                    favoriteNums: -1
                }
            },
            {
                $limit: 5
            }
        ]);
        return result;
    }
}

export const articleService = new ArticleService();
