import findAllArrayInObj from './findAllArrayInObj';

describe('test findAllArrayInObj function', () => {
  const callback = jest.fn();

  const testObj = {
    a1: {
      a2: 1,
      a3: [1, 2]
    },
    b2: {
      b1: [3, 4],
      b2: ''
    },
    c3: []
  };

  beforeEach(() => {
    callback.mockReset();
  });

  test('function should return null with no object element', () => {
    expect(findAllArrayInObj(1, callback)).toBeNull();
    expect(findAllArrayInObj('', callback)).toBeNull();
    expect(findAllArrayInObj(true, callback)).toBeNull();
  });

  test('function should not call callback func with no object element', () => {
    findAllArrayInObj(1, callback);
    findAllArrayInObj('', callback);
    findAllArrayInObj(true, callback);
    expect(callback.mock.calls.length).toBe(0);
  });
  test('function should call callback 2 times on testObj', () => {
    findAllArrayInObj(testObj, callback);
    expect(callback.mock.calls.length).toBe(2);
  });

  test('function should call callback with find array in argument', () => {
    findAllArrayInObj(testObj, callback);
    expect(callback.mock.calls[0][0]).toBe(testObj.a1.a3);
    expect(callback.mock.calls[1][0]).toBe(testObj.b2.b1);
  });
});
