/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-12 20:53:18
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-22 19:04:19
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \process2\server\base\baseService.ts
 */
import * as moment from 'moment';
import { ModelUpdateOptions, QueryFindOneAndUpdateOptions, FilterQuery, UpdateQuery, PaginateModel, PaginateResult, PaginateOptions } from 'mongoose';
import { BaseInterface, populateInterface } from './baseInterface';
export class BaseService<T extends BaseInterface> {
    constructor(public model: PaginateModel<T>) {
        this.model = model;
    }

    public async createItem(uid: string, body: T): Promise<T> {
        body.createdBy = uid;
        body.updatedBy = uid;
        body.createdAt = moment().unix();
        const item = new this.model(body);
        return item.save();
    }

    public async updateItem(uid: string, condition: UpdateQuery<T>, query: FilterQuery<T>, options?: ModelUpdateOptions) {
        condition = this._fullItem(uid, condition);
        query = this._fullQuery(query);
        await this.model.update(query, condition, options);
        return;
    };

    public async findOneAndUpdateItem(uid: string, query: FilterQuery<T>, condition: UpdateQuery<T>, options?: QueryFindOneAndUpdateOptions): Promise<T> {
        condition = this._fullItem(uid, condition);
        query = this._fullQuery(query);
        const result = await this.model.findOneAndUpdate(query, condition, options);
        return result;
    }

    public async getListByPage(query: FilterQuery<T>, limit = 10, page = 1, projection?: string, populate?: string | populateInterface | string[] | populateInterface[]): Promise<PaginateResult<T>> {
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

    public async getList(query: FilterQuery<T>, lean = false, projection?: string, populate?: string | populateInterface | [string] | populateInterface[]): Promise<T[]> {
        query = this._fullQuery(query);
        const result = await this.model.find(query, projection).populate(populate);
        return result;
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
        // condition.updatedAt = moment().unix();
        const result = await this.model.findOneAndUpdate(query, condition, options);
        return result;
    }

    private _fullItem(uid: string, body: UpdateQuery<T> = {}) {
        return Object.assign({
            updatedBy: uid,
            updatedAt: moment().unix()
        }, body);
    }

    private _fullQuery(query: FilterQuery<T>) {
        return Object.assign({
            is_deleted: 0
        }, query);
    }
}

