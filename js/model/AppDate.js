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

  setNextMonth() {
    // eslint-disable-next-line no-console
    console.log(`current`, this.calendarDate);
    this._calendarDate.setMonth(this._calendarDate.getMonth() + 1);
    // eslint-disable-next-line no-console
    console.log(`next`, this.calendarDate);
    return this.calendarDate;
  }

  setPrevMonth() {
    // eslint-disable-next-line no-console
    console.log(`current`, this.calendarDate);
    this._calendarDate.setMonth(this._calendarDate.getMonth() - 1);
    // eslint-disable-next-line no-console
    console.log(`prev`, this.calendarDate);
    return this.calendarDate;
  }
}

export default AppDate;
