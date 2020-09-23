import { BaseController } from '../base/baseController';
import { tagService, TagService } from './service'
import { ParameterizedContext } from 'koa'
export default class TagController extends BaseController<TagService> {
    constructor() {
        super(tagService)
    }
    
}
 