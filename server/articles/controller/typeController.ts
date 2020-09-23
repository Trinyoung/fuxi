import { BaseController } from '../../base/baseController';
import { TypeService, typeService } from '../service/type';

export default class TypeController extends BaseController<TypeService> {
    constructor() {
        super(typeService);
    }

}