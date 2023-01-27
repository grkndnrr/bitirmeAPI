import {Base} from "@/infastructure/models/base";

export interface BaseMain extends Base{
    UniqueKey: string;
    FullName: string;
    Password: string;

}