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
});
