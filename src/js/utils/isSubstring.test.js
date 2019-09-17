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
});
