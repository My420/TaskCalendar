import LocalStorage from './LocalStorage';

describe('LocalStorage class works correct', () => {
  const key = 'test';
  window.localStorage.removeItem(key);

  const defaultStorage = { color: 'red' };
  const storage = new LocalStorage(key, defaultStorage);

  const newDefaultStorage = { red: 'color' };

  test('LocalStorage create new app local storage if it not exist', () => {
    expect(window.localStorage.getItem(key)).toBe(
      JSON.stringify(defaultStorage)
    );
  });

  test('LocalStorage do not create new app local storage if it is exist', () => {
    const newStorage = new LocalStorage(key, newDefaultStorage);
    expect(window.localStorage.getItem(key)).toBe(
      JSON.stringify(defaultStorage)
    );
    expect(newStorage.appLocalStorage).toEqual(defaultStorage);
  });

  test('LocalStorage get appLocalStorage works correct', () => {
    expect(storage.appLocalStorage).toEqual(defaultStorage);
  });

  test('LocalStorage set appLocalStorage works correct', () => {
    storage.appLocalStorage = newDefaultStorage;
    expect(storage.appLocalStorage).toEqual(newDefaultStorage);
  });
});
