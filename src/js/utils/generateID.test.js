import generateID from './generateID';

describe('test generateID function', () => {
  const idList = [];
  for (let i = 0; i <= 120; i += 1) {
    idList.push(generateID());
  }

  test('function should generate unique ID', () => {
    for (let i = 0; i <= 120; i += 1) {
      for (let j = i + 1; j <= 120; j += 1) {
        expect(idList[i]).not.toBe(idList[j]);
      }
    }
  });
});
