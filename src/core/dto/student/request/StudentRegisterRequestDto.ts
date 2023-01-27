import {StudentType} from "../../../../helper/enums";

export interface StudentRegisterRequestDto{
    studentId: string;
    password: string;
    studentType: StudentType
}