/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-02 19:51:11
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 17:54:25
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\service\readService.ts
 */
import { BaseService } from "../../base/baseService"
import { ReadModel } from '../models/reader';
import { ReadInterface } from '../interface';

export class TypeService extends BaseService<ReadInterface> {
    constructor() {
        super(ReadModel);
    }
    
    
}

export const typeService = new TypeService(); 