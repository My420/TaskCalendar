import hideKeyboard from './hideKeyboard';

describe('test hideKeyboard function', () => {
  const elem = document.createElement('input');

  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('function should add readonly and disabled attr to element', () => {
    hideKeyboard(elem);
    expect(elem.hasAttributes('readonly')).toBeTruthy();
    expect(elem.hasAttributes('disabled')).toBeTruthy();
  });

  test('function should remove readonly and disabled attr after 100ms', () => {
    hideKeyboard(elem);
    jest.advanceTimersByTime(100);
    expect(elem.hasAttributes('readonly')).toBeFalsy();
    expect(elem.hasAttributes('disabled')).toBeFalsy();
  });
});
