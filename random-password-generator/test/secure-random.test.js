const { SecureRandom } = require('../lib/secure-random');

test('returns 0', () => {
  for (let i = 0; i < 100; i++) {
    expect(new SecureRandom().nextInt(1)).toEqual(0);
  }
});

test('uniform distribution', () => {
  const counter = [];

  for (let i = 0; i < 100000; i++) {
    const randomValue = new SecureRandom().nextInt(5000);
    counter[randomValue] = (counter[randomValue] || 0) + 1;
  }

  const entries = Object.entries(counter);
  expect(entries).toHaveLength(5000);
  entries.forEach(([key, val]) => {
    expect(Number(key)).toBeLessThan(5000);
    expect(Number(key)).toBeGreaterThanOrEqual(0);
    expect(val - 100000/5000).toBeLessThan(40);
  });
});
