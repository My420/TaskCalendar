import AppDate from './AppDate';
import AppTaskStorage from './AppTaskStorage';

class AppModel {
  constructor() {
    this._date = new AppDate();
    this._tasks = new AppTaskStorage();
  }

  changeMonthToNext() {
    const newDates = this._date.setNextMonth();
    const tasks = this._tasks.getTasksForCalendarPeriod(newDates.calendarDate);

    return { dates: newDates, tasks };
  }

  changeMonthToPrev() {
    const newDates = this._date.setPrevMonth();
    const tasks = this._tasks.getTasksForCalendarPeriod(newDates.calendarDate);

    return { dates: newDates, tasks };
  }

  changeTasksDate(newDate) {
    const newTaskDate = this._date.setTasksDate(newDate);
    const dayTasks = this._tasks.getTasksForDay(newDate);

    return { newTaskDate, dayTasks };
  }

  get calendarPeriodData() {
    const dates = this._date.allDates;
    const tasks = this._tasks.getTasksForCalendarPeriod(dates.calendarDate);

    return { dates, tasks };
  }

  addNewTask(task) {
    return this._tasks.addNewTask(task);
  }

  getTask(date, id) {
    return this._tasks.getTask(date, id);
  }

  deleteTask(date, id) {
    return this._tasks.deleteTask(date, id);
  }

  changeTask(newTask) {
    return this._tasks.changeTask(newTask);
  }

  migrateTask(data) {
    const { oldTask, newTask } = data;
    const { taskDate, taskId } = oldTask;
    const deletedTask = this.deleteTask(taskDate, taskId);
    const addedTask = this.addNewTask(newTask);

    return { deletedTask, addedTask };
  }
}

export default AppModel;
