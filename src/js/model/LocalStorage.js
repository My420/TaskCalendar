class LocalStorage {
  constructor(appKey, defaultStorage) {
    this._localStorage = window.localStorage;
    this._APP_KEY = appKey;
    this._defaultAppStorage = defaultStorage;
    this._createAppLocalStorage();
  }

  _createAppLocalStorage() {
    if (!this._localStorage.getItem(this._APP_KEY)) {
      this._localStorage.setItem(
        this._APP_KEY,
        JSON.stringify(this._defaultAppStorage)
      );
    }
  }

  get appLocalStorage() {
    return JSON.parse(this._localStorage.getItem(this._APP_KEY));
  }

  set appLocalStorage(newStorage) {
    this._localStorage.setItem(this._APP_KEY, JSON.stringify(newStorage));
  }
}

export default LocalStorage;
