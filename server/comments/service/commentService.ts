/*
 * @Author: Trinyoung.Lu
 * @Date: 2020-10-22 08:37:03
 * @LastEditors: Trinyoung.Lu
 * @LastEditTime: 2020-10-29 21:16:40
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

    async getListForComments(query: FilterQuery<CommentInterface>, lean: Boolean, projection?: string) {
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
        return this._cascaderForComments(result, [], userKeyByUid);
    }

    private _cascaderForComments(comments: CommentInterface[], result: any[], userKeyByUid: any) {
        const topComments = comments.filter(item => item.isTop);
        const childrenComments = comments.filter(item => !item.isTop);
        const commentKeyById = comments.reduce((x: any, y) => {
            x[JSON.stringify(y._id)] = y;
            return x;
        }, {});
        const commentKeyByParent = childrenComments.reduce((x: any, y) => {
            const replyObj: any = Object.assign({}, y);
            replyObj.nilName = y.nilName || userKeyByUid[y.createdBy].username || userKeyByUid[y.createdBy].realName;
            replyObj.email = y.email || userKeyByUid[y.createdBy].email;
            if (y.reply && JSON.stringify(y.reply) !== JSON.stringify(y.parent)) {
                replyObj.target = {
                    content: commentKeyById[JSON.stringify(y.reply)].content,
                    nilName: commentKeyById[JSON.stringify(y.reply)].nilName || userKeyByUid[commentKeyById[JSON.stringify(y.reply)].createdBy].username || userKeyByUid[commentKeyById[JSON.stringify(y.reply)].createdBy].realName
                }
            }
            if (x[JSON.stringify(y.parent)]) {
                x[JSON.stringify(y.parent)].push(replyObj);
            } else {
                x[JSON.stringify(y.parent)] = [replyObj];
            }
            return x;
        }, {});
        for (let i = 0; i < topComments.length; i++) {
            const comment = Object.assign({ children: [] }, topComments[i]);
            comment.nilName = userKeyByUid[comment.createdBy].username || userKeyByUid[comment.createdBy].realName;
            comment.email = userKeyByUid[comment.createdBy].email;
            if (commentKeyByParent[JSON.stringify(comment._id)]) {
                comment.children = commentKeyByParent[JSON.stringify(comment._id)];
            }
            result.push(comment);
        }
        return result;
    }
}
const commentService = new CommentService();
export { commentService, CommentService };