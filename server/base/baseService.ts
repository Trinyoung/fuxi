/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-12 20:53:18
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-20 09:42:53
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\base\baseService.ts
 */
import * as moment from 'moment';
import { ModelUpdateOptions, QueryFindOneAndUpdateOptions, FilterQuery, UpdateQuery, PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { BaseInterface, populateInterface } from './baseInterface';
export class BaseService<T extends BaseInterface> {
    constructor(public model: PaginateModel<T>) {
        this.model = model;
    }

    public async createItem(body: T): Promise<T> {
        body.createdAt = moment().unix();
        const item = new this.model(body);
        return item.save();
    }

    public async updateItem(condition: UpdateQuery<T>, query: FilterQuery<T>, options?: ModelUpdateOptions) {
        condition = this._fullItem(condition);
        query = this._fullQuery(query);
        await this.model.update(query, condition, options);
        return;
    };

    public async findOneAndUpdateItem(query: FilterQuery<T>, condition: UpdateQuery<T>, options?: QueryFindOneAndUpdateOptions): Promise<T> {
        condition = this._fullItem(condition);
        query = this._fullQuery(query);
        const result = await this.model.findOneAndUpdate(query, condition, options);
        return result;
    }

    public async getListByPage(query: FilterQuery<T>, page = 1, limit = 10, projection?: string, populate?: string | populateInterface | string[] | populateInterface[]): Promise<PaginateResult<T>> {
        let options: PaginateOptions;
        query = this._fullQuery(query);
        options = {
            lean: true,
            limit,
            page,
            select: projection,
            populate: populate
        };
        const result = await this.model.paginate(query, options);
        return result;
    }

    public async getList(query: FilterQuery<T>, lean = false, projection?: string, populate?: string | populateInterface | [string] | populateInterface[]) {
        query = this._fullQuery(query);
        const result = this.model.find(query, projection).populate(populate);
        if (lean) {
            return await result.lean(true)
        }
        return await result;
    }

    public async getItem(query?: FilterQuery<T>, projection?: string, lean = true, populate?: string | populateInterface | [string] | populateInterface[]) {
        query = this._fullQuery(query);
        const result = await this.model.findOne(query, projection).populate(populate).lean(lean);
        return result;
    }

    public returnError(code: string, message?: string) {
        return {
            code,
            message
        };
    }

    public async updateItemWithoutUid(query: FilterQuery<T>, condition: UpdateQuery<T>, options?: ModelUpdateOptions): Promise<T> {
        const result = await this.model.findOneAndUpdate(query, condition, options);
        return result;
    }

    private _fullItem(body: UpdateQuery<T> = {}) {
        return Object.assign({
            updatedAt: moment().unix()
        }, body);
    }

    _fullQuery(query: FilterQuery<T>) {
        return Object.assign({
            is_deleted: 0
        }, query);
    }
}

