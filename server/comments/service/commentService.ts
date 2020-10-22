/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-22 08:37:03
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-22 08:42:48
 * @PageTitle: XXX页面
 * @Description: XXX
 * @FilePath: \fuxi\server\comments\service\commentService.ts
 */
import { BaseService } from '../../base/baseService';
import { commentModel } from '../models/commentModel';
import { CommentInterface } from '../interface';
import { FilterQuery } from 'mongoose';
import { UserSchema } from '../../user/models/user';
import { User } from '../../user/userInterface';
class CommentService extends BaseService<CommentInterface> {
    constructor() {
        super(commentModel);
    }

    async getListForComments(query: FilterQuery<CommentInterface>, lean: Boolean, projection: string) {
        query = this._fullQuery(query);
        const model = this.model.find(query, projection);
        let result: CommentInterface[];

        if (lean) {
            result = await model.lean(true);
        } else {
            result = await model;
        }
        const uids: string[] = [];
        result.forEach(item => {
            if (item.createdBy) {
                uids.push(item.createdBy);
            }
        })
        const users = await UserSchema.find({ uid: { $in: uids } }, 'uid realName');
        const userKeyByUid = users.reduce((x: any, y: User) => {
            x[y.uid] = y;
            return x;
        }, {});
        this._cascaderForComments(result, [], userKeyByUid);
    }

    _cascaderForComments(comments: CommentInterface[], result: any[], userKeyByUid: any) {
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            if (comment.isTop) {
                if (comment.createdBy) {
                    comment.nilName = userKeyByUid[comment.createdBy].username || userKeyByUid[comment.createdBy].realName;
                    comment.email = userKeyByUid[comment.createdBy].email;
                }
                comments.splice(i, 1);
                i--;
                const children = comments.filter(item => {
                    return JSON.stringify(item.parent) === JSON.stringify(item._id)
                });
                const newChildren: any[] = [];
                children.forEach(item => {
                    if (item.reply) {
                        const replyObj = children.find(ele => JSON.stringify(ele._id) === JSON.stringify(item.reply));
                        if (replyObj.createdBy) {
                            replyObj.nilName = userKeyByUid[comment.createdBy].username || userKeyByUid[comment.createdBy].realName;
                        }
                        newChildren.push(Object.assign({ replyName: replyObj.nilName }, item))
                    }
                });
                const topComment = Object.assign({ children: newChildren }, comment);
                result.push(topComment);
            }
        }
        return result;
    }
}
const commentService = new CommentService();
export { commentService, CommentService };