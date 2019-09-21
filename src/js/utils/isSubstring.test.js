import * as fc from 'fast-check';
import isSubstring from './isSubstring';

describe('test isSubstring function', () => {
  const string = 'test';
  const correct = ['test', 'aadctestacf', '  test  ', 'tEst', '**TeSt**'];
  const incorrect = ['tesa', 'tes t', '12tets', 'tset', 'te1st'];

  test('function should return true with correct array string', () => {
    for (let i = 1; i < correct.length; i += 1) {
      expect(isSubstring(correct[i], string)).toBeTruthy();
    }
  });

  test('function should return false with incorrect array string', () => {
    for (let i = 1; i < correct.length; i += 1) {
      expect(isSubstring(incorrect[i], string)).toBeFalsy();
    }
  });

  test('the returned string must contain the lines of which it consists', () => {
    fc.assert(
      fc.property(fc.array(fc.string(4, 10), 4, 10), arr => {
        const str = arr.join('');

        for (let i = 0; i < arr.length; i += 1) {
          expect(isSubstring(str, arr[0])).toBeTruthy();
        }
      })
    );
  });
});
