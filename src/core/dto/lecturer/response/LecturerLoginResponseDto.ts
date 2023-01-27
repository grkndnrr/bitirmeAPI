export class LecturerLoginResponseDto {
    fullName: string;
    uniqueKey: string;
    expirationDate: Date;
    expirationOption: string;
    constructor( fullName: string, uniqueKey: string,
                 expirationDate: Date,
                 expirationOption: string ) {
        this.fullName = fullName;
        this.uniqueKey = uniqueKey;
        this.expirationDate = expirationDate;
        this.expirationOption = expirationOption;
    }
}