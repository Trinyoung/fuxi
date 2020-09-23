/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 11:14:30
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 18:16:13
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\articles\controller\favoriteController.ts
 */
import { BaseController } from '../../base/baseController';
import { FavoriteService, favoriteService } from '../service/favorite';

export default class FavoriteController extends BaseController<FavoriteService> {
    constructor() {
        super(favoriteService);
    }
}