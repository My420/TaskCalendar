import AppDate from './AppDate';
import AppTaskStorage from './AppTaskStorage';

class AppModel {
  constructor() {
    this._date = new AppDate();
    this._tasks = new AppTaskStorage();
  }

  changeMonthToNext() {
    const newDates = this._date.setNextMonth();
    return newDates;
  }

  changeMonthToPrev() {
    const newDates = this._date.setPrevMonth();
    return newDates;
  }

  changeTasksDate(newDate) {
    const newTaskDate = this._date.setTasksDate(newDate);
    return newTaskDate;
  }

  get calendarPeriodData() {
    const dates = this._date.allDates;
    const tasks = this._tasks.getTasksForCalendarPeriod(dates.calendarDate);

    return { dates, tasks };
  }

  addNewTask(task) {
    this._tasks.addNewTask(task);
  }
}

export default AppModel;
