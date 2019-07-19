import deleteTimePart from './deleteTimePart';

describe('test deleteTimePart function', () => {
  test('function should work correct', () => {
    const timeString = `2019-07-01T08:32:16.983Z`;
    expect(deleteTimePart(timeString)).toBe('2019-07-01');
  });
});
