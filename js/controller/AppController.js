import AppDate from '../model/AppDate';
import AppView from '../view/AppView';

class AppController {
  constructor(rootElement) {
    this._rootElement = rootElement;
    this._model = new AppDate();
    this._view = new AppView(this._model.allDates, this._rootElement);
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

    this._view.onCellClick = cellDate => {
      const newDate = this._model.setTasksDate(cellDate);
      this._view.changeTasksDate(newDate);
    };
    this._view.render();
  }
}

export default AppController;
