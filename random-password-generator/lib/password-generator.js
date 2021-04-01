const defaults = Object.freeze({
  useUpperCase: true,
  useLowerCase: true,
  useNumbers: true,
  length: 10,
});

class PasswordGenerator {
  constructor(random) {
    this.random = random;
  }

  generatePassword(options) {
    const parsedOptions = {
      ...defaults,
      ...options
    };

    if (!this.isValidOptions(parsedOptions)) {
      throw new Error('Invalid Options');
    }

    const charGroups = [];

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

  isValidOptions(options) {
    return options.length >= 0 &&
        options.length < 0xffff &&
        (options.useUpperCase || options.useLowerCase || options.useNumbers);
  }

  pickOneFromArray(array) {
    return array[this.random.nextInt(array.length)];
  }
}

exports.defaults = defaults;

exports.PasswordGenerator = PasswordGenerator;
