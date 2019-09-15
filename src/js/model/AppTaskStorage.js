import {
  APP_KEY,
  DEFAULT_APP_STORAGE,
  CALENDAR_DAY_AMOUNT
} from '../utils/constant';
import LocalStorage from './LocalStorage';
import dateToObject from '../utils/dateToObject';
import setDayOnMonday from '../utils/setDayOnMonday';
import deleteTimePart from '../utils/deleteTimePart';
import findTaskIndex from '../utils/findTaskIndex';

class AppTaskStorage {
  constructor() {
    this._key = APP_KEY;
    this._defaultStorage = DEFAULT_APP_STORAGE;
    this._localStorage = new LocalStorage(this._key, this._defaultStorage);
    this._taskStore = this._localStorage.appLocalStorage;
  }

  _updateLocalStorage() {
    this._localStorage.appLocalStorage = { ...this._taskStore };
  }

  getTasksForDay(dayDate) {
    const date = dateToObject(dayDate);
    if (this._taskStore[date.month][date.year]) {
      if (this._taskStore[date.month][date.year][date.date]) {
        return [...this._taskStore[date.month][date.year][date.date]];
      }
    }

    return null;
  }

  getTasksForCalendarPeriod(calendarDate) {
    const date = new Date(calendarDate);
    setDayOnMonday(date);
    const tasks = {};
    for (let i = 0; i < CALENDAR_DAY_AMOUNT; i += 1) {
      const currentDate = deleteTimePart(date.toJSON());
      const dayTasks = this.getTasksForDay(currentDate);
      if (dayTasks) {
        tasks[currentDate] = dayTasks;
      }
      date.setDate(date.getDate() + 1);
    }

    return tasks;
  }

  addNewTask(task) {
    const date = dateToObject(task.taskDate);

    if (this._taskStore[date.month][date.year]) {
      if (this._taskStore[date.month][date.year][date.date]) {
        this._taskStore[date.month][date.year][date.date].push(task);
      } else {
        this._taskStore[date.month][date.year][date.date] = [task];
      }
    } else {
      this._taskStore[date.month][date.year] = { [date.date]: [task] };
    }
    this._updateLocalStorage();
    return task;
  }

  getTask(date, id) {
    const dayTasks = this.getTasksForDay(date);

    for (let i = 0; i < dayTasks.length; i += 1) {
      if (dayTasks[i].taskId === id) {
        return { ...dayTasks[i] };
      }
    }

    return null;
  }

  deleteTask(taskDate, id) {
    const date = dateToObject(taskDate);

    if (this._taskStore[date.month][date.year]) {
      if (this._taskStore[date.month][date.year][date.date]) {
        const dayTasks = this._taskStore[date.month][date.year][date.date];
        const deleteTaskIndex = findTaskIndex(dayTasks, id);
        const deletedTasks = dayTasks.splice(deleteTaskIndex, 1);
        this._updateLocalStorage();
        return deletedTasks[0];
      }
    }

    return null;
  }

  changeTask(newTask) {
    const task = { ...newTask };
    const { taskDate, taskId } = newTask;
    const date = dateToObject(taskDate);

    if (this._taskStore[date.month][date.year]) {
      if (this._taskStore[date.month][date.year][date.date]) {
        const dayTasks = this._taskStore[date.month][date.year][date.date];
        const changeTaskIndex = findTaskIndex(dayTasks, taskId);
        dayTasks[changeTaskIndex] = task;
        this._updateLocalStorage();
        return { ...dayTasks[changeTaskIndex] };
      }
    }

    return null;
  }
}

export default AppTaskStorage;