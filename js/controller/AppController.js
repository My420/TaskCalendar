import AppDate from '../model/AppDate';
import AppView from '../view/AppView';

class AppController {
  constructor() {
    this._model = new AppDate();
    this._view = new AppView(this._model.allDates);
  }

  init() {
    this._view.onPrevButtonClick = () => {
      const newDates = this._model.setPrevMonth();
      this._view.changeCalendarDate(newDates);
    };
    this._view.onNextButtonClick = () => {
      const newDates = this._model.setNextMonth();
      this._view.changeCalendarDate(newDates);
    };
    this._view.init();
  }
}

export default AppController;
