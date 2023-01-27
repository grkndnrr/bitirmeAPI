import {AuthType} from "../../helper/enums";

export class AuthDto {
  uniqueKey: string;
  fullName: string;
  type: AuthType;

  constructor(uniqueKey: string, fullName: string, type: AuthType) {
    this.uniqueKey = uniqueKey;
    this.fullName = fullName;
    this.type = type;
  }
}