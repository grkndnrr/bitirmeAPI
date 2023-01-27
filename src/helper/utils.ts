import * as crypto from 'crypto';

export default class Utils {

  static isReallyNull(value: string): boolean {
    return !!(
      typeof value == 'undefined' ||
      Object.keys(value).length === 0 ||
      value == undefined ||
      value === null ||
      value.length === 0
    );
  }

  static convertDate(date: string): Date {
    const [day, month, year] = date.split(".")
    return new Date(`${year}-${month}-${day}T00:00:00Z`)
  }

  static uuid(length = 36): string {
    let dt = new Date().getTime();
    const _uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
      const r: number = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return length ? _uuid.replace(/-/g, '').substring(0, length) : _uuid.replace(/-/g, '');
  }

  static replaceAll(text: string, str1: string, str2: string, ignore: boolean): string {
    return text.replace(
      new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), ignore ? 'gi' : 'g'),
      typeof str2 === 'string' ? str2.replace(/\$/g, '$$$$') : str2,
    );
  }
  static hash256(str: string) {
    // create a sha-256 hasher
    const sha256Hasher = crypto.createHmac('sha256', process.env.APP_SECRET);
    // hash the string
    return sha256Hasher.update(str).digest('hex');
  }

  static dateCheck(start: Date, end: Date, date: Date) {
    if (date >= start && date <= end) {
      return true;
    }
    else {
      return false;
    }
  }
  static async sleep(ms): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /* eslint @typescript-eslint/no-unused-vars: "off" */
  static removeEmpty<T>(obj: T): T {
    return Object.entries(obj)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) as T;
  }
  static randomNumber = (length) => {
    const digit = length - 1
    return Math.floor((10 ** digit) + Math.random() * ((10 ** digit) * 9))
  };
}