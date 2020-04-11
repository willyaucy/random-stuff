import { PasswordGenerator } from './password-generator';
import { SecureRandom } from './secure-random';

console.log(new PasswordGenerator(new SecureRandom()).generatePassword());
