/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:30
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-09-23 16:21:10
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\user\service.ts
 */
// import { User } from '../../models/User';
import { BaseService } from '../base/baseService';
import { UserSchema } from './models/user';
import { User } from './userInterface';
class UserService extends BaseService<User> {
    constructor() {
        super(UserSchema);
    }

}
const userService = new UserService();
export { userService, UserService };