import markSubstring from './markSubstring';

describe('test markSubstring function', () => {
  test('function should mark string with * by default', () => {
    expect(markSubstring('11tEst11', 'test')).toBe('11*tEst*11');
  });

  test('function should mark string with mark transferred in arguments', () => {
    expect(markSubstring('11test11', 'test', '--', '--')).toBe('11--test--11');
  });
});
