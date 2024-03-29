/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-08-17 08:32:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 15:34:21
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\user\controller.ts
 */
import { ParameterizedContext } from 'koa';
import { BaseController } from '../base/baseController';
import { userService, UserService } from './service';

export default class UserController extends BaseController<UserService> {
    constructor () {
        super(userService);
    }

    async getUserInfo (ctx: ParameterizedContext) {
        const uid = ctx.query.uid as string;
        const result = await this.service.getItem({ uid }, 'username createdAt realName uid avatar');
        ctx.body = { code: '000', result };
    }
}
