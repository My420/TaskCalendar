import compareUpToMonth from '../utils/compareUpToMonth';

class AppDate {
  constructor() {
    this._todayDate = new Date();
    this._calendarDate = new Date();
    this._calendarDate.setDate(1);
    this._tasksDate = new Date();
  }

  static toJsonWithLocalTimeZone(date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toJSON();
  }

  get todayDate() {
    return AppDate.toJsonWithLocalTimeZone(this._todayDate);
  }

  get calendarDate() {
    return AppDate.toJsonWithLocalTimeZone(this._calendarDate);
  }

  get tasksDate() {
    return AppDate.toJsonWithLocalTimeZone(this._tasksDate);
  }

  get allDates() {
    return {
      calendarDate: this.calendarDate,
      tasksDate: this.tasksDate,
      todayDate: this.todayDate
    };
  }

  setNextMonth() {
    this._calendarDate.setMonth(this._calendarDate.getMonth() + 1);

    if (compareUpToMonth(this.calendarDate, this.todayDate)) {
      this._tasksDate = new Date(this.todayDate);
    } else {
      this._tasksDate = new Date(this.calendarDate);
    }

    return this.allDates;
  }

  setPrevMonth() {
    this._calendarDate.setMonth(this._calendarDate.getMonth() - 1);

    if (compareUpToMonth(this.calendarDate, this.todayDate)) {
      this._tasksDate = new Date(this.todayDate);
    } else {
      this._tasksDate = new Date(this.calendarDate);
    }

    return this.allDates;
  }

  setCalendarDate(date) {
    this._calendarDate = new Date(date);
    this._calendarDate.setDate(1);
  }

  setTasksDate(date) {
    this._tasksDate = new Date(date);
    return this.tasksDate;
  }
}

export default AppDate;
