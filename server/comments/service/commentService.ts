import { BaseService } from '../../base/baseService';
import { commentModel } from '../models/commentModel';
import { CommentInterface } from '../interface';
class CommentService extends BaseService<CommentInterface> {
    constructor() {
        super(commentModel);
    }

}
const commentService = new CommentService();
export { commentService, CommentService };