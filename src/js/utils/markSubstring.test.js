import * as fc from 'fast-check';
import markSubstring from './markSubstring';

describe('test markSubstring function', () => {
  test('function should mark string with * by default', () => {
    expect(markSubstring('11tEst11', 'test')).toBe('11*tEst*11');
  });

  test('function should mark string with mark transferred in arguments', () => {
    expect(markSubstring('11test11', 'test', '$$', '$$')).toBe('11$$test$$11');
  });

  test('the returned string must contain the lines of which it consists', () => {
    fc.assert(
      fc.property(fc.array(fc.string(4, 10), 4, 10), arr => {
        const string = arr.join('');

        for (let i = 0; i < arr.length; i += 1) {
          const returnedString = markSubstring(string, arr[0]);
          expect(returnedString.indexOf(arr[0])).not.toBe(-1);
        }
      })
    );
  });

  test('the returned string must contain open and close mark', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string(4, 10), 5, 5),
        fc.string(1, 10),
        fc.string(1, 10),
        (arr, open, close) => {
          const string = arr.join('');
          const returnedString = markSubstring(string, arr[2], open, close);
          expect(returnedString.indexOf(open)).not.toBe(-1);
          expect(returnedString.indexOf(close)).not.toBe(-1);
        }
      )
    );
  });
});
