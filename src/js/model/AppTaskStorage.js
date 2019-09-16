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

  _findDay(dayDate) {
    const date = dateToObject(dayDate);
    if (this._taskStore[date.month][date.year]) {
      if (this._taskStore[date.month][date.year][date.date]) {
        return this._taskStore[date.month][date.year][date.date];
      }
    }

    return null;
  }

  _findYear(dayDate) {
    const date = dateToObject(dayDate);
    if (this._taskStore[date.month][date.year]) {
      return this._taskStore[date.month][date.year];
    }
    return null;
  }

  getTasksForDay(dayDate) {
    const tasks = this._findDay(dayDate);
    return tasks && [...tasks];
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
    const { taskDate } = task;
    const date = dateToObject(taskDate);
    const day = this._findDay(taskDate);
    const year = this._findYear(taskDate);
    if (year) {
      if (day) {
        day.push(task);
      } else {
        year[date.date] = [task];
      }
    } else {
      this._taskStore[date.month][date.year] = { [date.date]: [task] };
    }
    this._updateLocalStorage();
    return { ...task };
  }

  getTask(date, id) {
    const dayTasks = this._findDay(date);

    for (let i = 0; i < dayTasks.length; i += 1) {
      if (dayTasks[i].taskId === id) {
        return { ...dayTasks[i] };
      }
    }

    return null;
  }

  deleteTask(taskDate, id) {
    const day = this._findDay(taskDate);
    if (day) {
      const deleteTaskIndex = findTaskIndex(day, id);
      const deletedTasks = day.splice(deleteTaskIndex, 1);
      this._updateLocalStorage();
      return deletedTasks[0];
    }
    return null;
  }

  changeTask(newTask) {
    const task = { ...newTask };
    const { taskDate, taskId } = newTask;
    const day = this._findDay(taskDate);

    if (day) {
      const changeTaskIndex = findTaskIndex(day, taskId);
      day[changeTaskIndex] = task;
      this._updateLocalStorage();
      return { ...day[changeTaskIndex] };
    }
    return null;
  }

  migrateTask(data) {
    const { oldTask, newTask } = data;
    const { taskDate, taskId } = oldTask;
    const deletedTask = this.deleteTask(taskDate, taskId);
    const addedTask = this.addNewTask(newTask);

    return { deletedTask, addedTask };
  }
}

export default AppTaskStorage;
