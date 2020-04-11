import { PasswordGenerator } from '../lib/password-generator';
import { SecureRandom } from '../lib/secure-random';

test('returns a basic password', () => {
  expect(new PasswordGenerator(new SecureRandom()).generatePassword()).toHaveLength(10);
});
