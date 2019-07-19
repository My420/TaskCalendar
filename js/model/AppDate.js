class AppDate {
  constructor() {
    this._todayDate = new Date();
    this._calendarDate = new Date();
    this._calendarDate.setDate(1);
    this._tasksDate = new Date();
  }

  get todayDate() {
    return this._todayDate.toJSON();
  }

  get calendarDate() {
    return this._calendarDate.toJSON();
  }

  get tasksDate() {
    return this._tasksDate.toJSON();
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
    this._tasksDate = new Date(this.calendarDate);

    return this.allDates;
  }

  setPrevMonth() {
    this._calendarDate.setMonth(this._calendarDate.getMonth() - 1);
    this._tasksDate = new Date(this.calendarDate);

    return this.allDates;
  }
}

export default AppDate;
