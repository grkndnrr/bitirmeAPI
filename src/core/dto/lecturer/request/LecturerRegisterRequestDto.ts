import {LecturerType} from "../../../../helper/enums";

export class LecturerRegisterRequestDto{
    email: string;
    password: string;
    lecturerType: LecturerType; // 1 , 2, 3
    fullName: string;




}