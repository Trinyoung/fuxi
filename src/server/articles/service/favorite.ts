/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 19:06:32
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\favorite.ts
 */
import { BaseService } from '../../base/baseService';
import { favoriteModel } from '../models/favorite';
import { FavoriteInterface } from '../interface';
import { FilterQuery } from 'mongoose';

export class FavoriteService extends BaseService<FavoriteInterface> {
    constructor () {
        super(favoriteModel);
    }

    public async getNums (query: FilterQuery<FavoriteInterface>) {
        return await this.model.countDocuments(query);
    }
}

export const favoriteService = new FavoriteService();
