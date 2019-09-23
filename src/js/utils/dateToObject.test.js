import * as fc from 'fast-check';
import dateToObject from './dateToObject';

describe('test dateToObject function', () => {
  const date = `2019-02-01`;
  const testObject = dateToObject(date);

  test('function should retrun object ', () => {
    expect(typeof testObject).toBe('object');
  });

  test('function should retrun object with correct property ', () => {
    expect(testObject.year).toBe('2019');
    expect(testObject.month).toBe('02');
    expect(testObject.date).toBe('01');
  });

  test('returned object should transform in original string ', () => {
    fc.assert(
      fc.property(
        fc.integer(1000, 9000),
        fc.integer(10, 99),
        fc.integer(10, 99),
        (a, b, c) => {
          const str = `${a}-${b}-${c}`;
          const { year, month, date: d } = dateToObject(str);
          const newStr = `${year}-${month}-${d}`;
          expect(newStr).toBe(str);
        }
      )
    );
  });
});
