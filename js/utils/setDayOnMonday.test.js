import setDayOnMonday from './setDayOnMonday';

describe('test setDayOnMonday function', () => {
  test('function should work correct', () => {
    const date = new Date('2019-08-04');
    setDayOnMonday(date);
    expect(date.getDay()).toBe(1);
  });
  test('function should work correct on Monday Day', () => {
    const date = new Date('2019-07-01');
    setDayOnMonday(date);
    expect(date.getDay()).toBe(1);
  });
});
