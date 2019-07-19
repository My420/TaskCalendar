import AppDate from '../model/AppDate';
import AppView from '../view/AppView';

class AppController {
  constructor() {
    this._model = new AppDate();
    const { calendarDate } = this._model;
    this._view = new AppView(calendarDate);
  }

  init() {
    this._view.onPrevButtonClick = () => {
      const newCalendarDate = this._model.setPrevMonth();
      this._view.changeCalendarDate(newCalendarDate);
    };
    this._view.onNextButtonClick = () => {
      const newCalendarDate = this._model.setNextMonth();
      this._view.changeCalendarDate(newCalendarDate);
    };
    this._view.init();
  }
}

export default AppController;
