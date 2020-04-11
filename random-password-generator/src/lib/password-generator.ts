import { Random } from './random';

export interface Options {
  useUpperCase?: boolean;
  useLowerCase?: boolean;
  useNumbers?: boolean;
  length?: number;
}

export const defaults: Options = Object.freeze({
  useUpperCase: true,
  useLowerCase: true,
  useNumbers: true,
  length: 10,
});

export class PasswordGenerator {
private random: Random;

  constructor(random: Random) {
    this.random = random;
  }

  generatePassword(options?: Options): string {
    const parsedOptions: Options = {
      ...defaults,
      ...options
    };

    if (!this.isValidOptions(parsedOptions)) {
      throw new Error('Invalid Options');
    }

    const charGroups: string[][] = [];

    if (parsedOptions.useUpperCase) {
      charGroups.push([...Array(26)].map((v, idx) => String.fromCharCode('A'.charCodeAt(0) + idx)));
    }

    if (parsedOptions.useLowerCase) {
      charGroups.push([...Array(26)].map((v, idx) => String.fromCharCode('a'.charCodeAt(0) + idx)));
    }

    if (parsedOptions.useNumbers) {
      charGroups.push([...Array(10)].map((v, idx) => String(idx)));
    }

    return [...Array(parsedOptions.length)]
        .map(() => (chars => this.pickOneFromArray(chars))(
            this.pickOneFromArray(charGroups)))
        .join('');
  }

  private isValidOptions(options: Options) {
    return options.length >= 0 &&
        options.length < 0xffff &&
        (options.useUpperCase || options.useLowerCase || options.useNumbers);
  }

  private pickOneFromArray<T>(array: T[]): T {
    return array[this.random.nextInt(array.length)];
  }
}
