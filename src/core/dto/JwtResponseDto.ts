export class JwtResponseDto {
    token: string;
    expireDate: Date;

    constructor(token: string, expireDate: Date) {
        this.token = token;
        this.expireDate = expireDate;
    }
}