import compareUpToMonth from './compareUpToMonth';

describe('test compareUpToMonth function', () => {
  describe('function should work correct with Date().toJSON string', () => {
    test('function should retrun false if dates is different ', () => {
      const date1 = `2019-02-01T08:32:16.983Z`;
      const date2 = `2019-07-01T08:32:16.983Z`;
      expect(compareUpToMonth(date1, date2)).toBeFalsy();
    });

    test('function should retrun true if dates is equal ', () => {
      const date1 = `2019-02-01T08:32:16.983Z`;
      const date2 = `2019-02-03T08:42:16.983Z`;
      expect(compareUpToMonth(date1, date2)).toBeTruthy();
    });
  });

  describe('function should work correct with short date string', () => {
    test('function should retrun false if dates is different ', () => {
      const date1 = `2019-02-03`;
      const date2 = `2018-07-21`;
      expect(compareUpToMonth(date1, date2)).toBeFalsy();
    });

    test('function should retrun true if dates is equal ', () => {
      const date1 = `2019-02-01`;
      const date2 = `2019-02-21`;
      expect(compareUpToMonth(date1, date2)).toBeTruthy();
    });
  });
});
