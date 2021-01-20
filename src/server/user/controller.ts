/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-08-17 08:32:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-20 16:12:31
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
        const { createdBy } = ctx.query;
        const result = await this.service.getItem({ createdBy }, 'username createdAt realName uid');
        ctx.body = { code: '000', result };
    }
}
