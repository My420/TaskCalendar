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
import findSubstring from '../utils/findSubstring';
import markSubstring from '../utils/markSubstring';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["_findSuitableTasks","_createSearchResult"] }] */

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

  _collectAllDaysWithTask(elem, arr) {
    if (typeof elem === 'object') {
      if (Array.isArray(elem)) {
        if (elem.length > 0) {
          arr.push(elem);
          return null;
        }
        return null;
      }
      const child = Object.keys(elem);
      for (let i = 0; i < child.length; i += 1) {
        this._collectAllDaysWithTask(elem[child[i]], arr);
      }
    }
    return null;
  }

  _findSuitableTasks(daysArr, text) {
    const suitableTasks = [];
    for (let i = 0; i < daysArr.length; i += 1) {
      const dayTasks = daysArr[i];
      for (let j = 0; j < dayTasks.length; j += 1) {
        const task = dayTasks[j];
        const { taskName, taskDescription } = task;
        if (
          findSubstring(taskName, text) ||
          findSubstring(taskDescription, text)
        ) {
          suitableTasks.push(task);
        }
      }
    }
    return suitableTasks;
  }

  _createSearchResult(task, text) {
    const { taskDate, taskName, taskDescription, taskColor, taskStatus } = task;
    const matchText =
      (findSubstring(taskName, text) && markSubstring(taskName, text)) ||
      (findSubstring(taskDescription, text) &&
        markSubstring(taskDescription, text));
    return {
      color: taskColor,
      status: taskStatus,
      text: matchText,
      date: taskDate
    };
  }

  _createSearchAnswer(suitableTasks, text) {
    const answer = [];
    for (let i = 0; i < suitableTasks.length; i += 1) {
      const result = this._createSearchResult(suitableTasks[i], text);
      answer.push(result);
    }
    return answer;
  }

  _search(text) {
    const daysArr = [];
    this._collectAllDaysWithTask(this._taskStore, daysArr);
    const suitableTasks = this._findSuitableTasks(daysArr, text);
    const answer = this._createSearchAnswer(suitableTasks, text);
    return answer;
  }

  search(text) {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = this._search(text);
        resolve(result);
      }, 2000);
    });
  }
}

export default AppTaskStorage;
