import { BaseService } from '../base/baseService';
import { TagInterface } from './interface';
import { TagModel } from './model';
export class TagService extends BaseService<TagInterface> {
    constructor() {
        super(TagModel)
    }
}

export const tagService = new TagService();