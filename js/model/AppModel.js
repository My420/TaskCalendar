import AppDate from './AppDate';
import AppTaskStorage from './AppTaskStorage';

class AppModel {
  constructor() {
    this._date = new AppDate();
    this._tasks = new AppTaskStorage();
  }

  changeMonthToNext() {
    const newDates = this._date.setPrevMonth();
    return newDates;
  }

  changeMonthToPrev() {
    const newDates = this._date.setNextMonth();
    return newDates;
  }

  changeTasksDate(newDate) {
    const newTaskDate = this._date.setTasksDate(newDate);
    return newTaskDate;
  }

  get monthData() {
    return this._date.allDates;
  }
}

export default AppModel;
