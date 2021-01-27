/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 11:14:30
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 11:30:21
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \process2\server\articles\controller\readerController.ts
 */
import { BaseController } from '../../base/baseController';
import { readService, ReadService } from '../service/readService';

export default class ReaderController extends BaseController<ReadService> {
    constructor() {
        super(readService);
    }

}