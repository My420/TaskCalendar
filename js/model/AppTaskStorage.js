import { APP_KEY, DEFAULT_APP_STORAGE } from '../utils/constant';
import LocalStorage from './LocalStorage';

class AppTaskStorage {
  constructor() {
    this._key = APP_KEY;
    this._defaultStorage = DEFAULT_APP_STORAGE;
    this._localStorage = new LocalStorage(this._key, this._defaultStorage);
    this._taskStore = this._localStorage.appLocalStorage;
  }

  get taskStore() {
    return this._taskStore;
  }
}

export default AppTaskStorage;
