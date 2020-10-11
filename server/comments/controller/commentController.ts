import { BaseController } from '../../base/baseController';
import { CommentService, commentService} from '../service/commentService';
export default class CommentController extends BaseController<CommentService> {
    constructor () {
        super(commentService)
    }
}