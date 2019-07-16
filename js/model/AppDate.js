class AppDate {
  constructor() {
    this._todayDate = new Date();
    this._chosenDate = new Date();
    this._chosenDate.setDate(1);
  }

  get todayDate() {
    return this._todayDate;
  }

  get chosenDate() {
    return this._chosenDate;
  }

  setNextMonth() {
    this._chosenDate.setMonth(this._chosenDate.getMonth() + 1);
  }

  setPrevMonth() {
    this._chosenDate.setMonth(this._chosenDate.getMonth() - 1);
  }
}

export default AppDate;
