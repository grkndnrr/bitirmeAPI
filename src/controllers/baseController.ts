import {AuthDto} from "../core/dto/AuthDto";


export class BaseController {
    user?: AuthDto;

    constructor(user?:AuthDto) {
        this.user = user;
    }
}