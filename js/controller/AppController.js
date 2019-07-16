import AppDate from '../model/AppDate';
import AppView from '../view/AppView';

class AppController {
  constructor() {
    this._model = new AppDate();
  }

  init() {
    const { chosenDate } = this._model;
    this._view = new AppView(chosenDate);
    this._view.init();
  }
}

export default AppController;
