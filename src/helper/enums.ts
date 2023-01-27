export enum ErrorCodes{
    UnAuthorizedToken = "4001",
    JWTExpired = "4002",
    EmailNotConfirmed = "4003",
    StudentNotFound = "4004",
    LecturerNotFound = "4005",
    StudentExists = "4006",
    LecturerExists = "4007"

}

export const enum LogType {
    Info = 'INFO',
    Warning = 'WARNING',
    Error = 'ERROR',
}
export enum DELIMITERS {
    HTTP_ERROR = "-"
}
export enum HTTP_STATES {
    DEFAULT_ERROR= 400,
    UNAUTHORIZED = 401,
    NOT_PERMITTED = 403,
    MOBILE_DEFAULT_ERROR= 470,
    INTERNAL_ERROR=500
}

export enum AuthType {
    Lecturer,
    Student
}

export enum StudentType {
    First= 1,
    Second = 2
}

export enum LecturerType {
    FullTime= 1,
    PartTime = 2,
    Assistant = 3,
}

