import * as fc from 'fast-check';
import escapeSpecialCharacters from './escapeSpecialCharacters';

describe('test escapeSpecialCharacters function', () => {
  test('the returned string must match original string', () => {
    fc.assert(
      fc.property(fc.string(), value => {
        const escapedString = escapeSpecialCharacters(value);
        const escapedRegExp = new RegExp(escapedString);
        expect(escapedRegExp.test(value)).toBeTruthy();
      })
    );
  });
});
