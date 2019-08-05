import AppView from '../view/AppView';
import AppModel from '../model/AppModel';

class AppPresenter {
  constructor(rootElement) {
    this._rootElement = rootElement;
    this._model = new AppModel();
    this._view = new AppView(this._model.calendarPeriodData, this._rootElement);
  }

  init() {
    this._view.onPrevButtonClick = () => {
      const newDates = this._model.changeMonthToPrev();
      this._view.changeCalendarDate(newDates);
    };
    this._view.onNextButtonClick = () => {
      const newDates = this._model.changeMonthToNext();
      this._view.changeCalendarDate(newDates);
    };

    this._view.onCellClick = cellDate => {
      const newDate = this._model.changeTasksDate(cellDate);
      this._view.changeTasksDate(newDate);
    };

    this._view.onNewCardAdd = data => {
      this._model.addNewTask(data);
    };

    this._view.render();
  }
}

export default AppPresenter;
