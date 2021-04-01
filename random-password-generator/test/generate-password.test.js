const { PasswordGenerator } = require('../lib/password-generator');
const { SecureRandom } = require('../lib/secure-random');

test('returns a basic password', () => {
  expect(new PasswordGenerator(new SecureRandom()).generatePassword()).toHaveLength(10);
});
