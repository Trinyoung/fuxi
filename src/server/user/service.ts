/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-09-23 15:45:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 10:54:40
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

    async getHotAuthors() {
        const users = await this.model.aggregate([
            { $match: { is_deleted: 0 } },
            {
                $lookUp: {
                    from: 'articles',
                    localField: 'uid',
                    foreignField: 'createdBy',
                    as: 'articles'
                },
            },
            {
                $lookUp: {
                    from: 'favorites',
                    localField: 'uid',
                    foreignField: 'createdBy',
                    as: 'favorites'
                }
            },
            {
                $lookUp: {
                    from: 'comments',
                    localField: 'uid',
                    foreignField: 'createdBy',
                    as: 'comments'
                }
            },
            {
                $lookUp: {
                    from: 'reads',
                    localField: 'uid',
                    foreignField: 'createdBy',
                    as: 'reads'
                }
            },
            {
                $group: {_id: '$uid', favoritesNum: {$sum: '$favorites'}}
            }
        ])
    }
}
const userService = new UserService();
export { userService, UserService };