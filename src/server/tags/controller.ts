/*
 * @Author: your name
 * @Date: 2020-09-23 15:45:38
 * @LastEditTime: 2020-11-27 19:35:17
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \fuxi\src\server\tags\controller.ts
 */
import { BaseController } from '../base/baseController';
import { tagService, TagService } from './service'
export default class TagController extends BaseController<TagService> {
    constructor() {
        super(tagService)
    }
    
}
 