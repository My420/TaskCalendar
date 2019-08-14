import AbstractView from './AbstractView';
import getCalendarTemplate from './calendarTemplate';
import deleteTimePart from '../utils/deleteTimePart';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["bind","unbind","onCellClick"]}] */
class CalendarView extends AbstractView {
  constructor(
    calendarDate,
    tasksDate,
    todayDate,
    calendarPeriodTasks,
    parentElement
  ) {
    super(parentElement);
    this._calendarDate = calendarDate;
    this._tasksDate = tasksDate;
    this._todayDate = todayDate;
    this._tasks = calendarPeriodTasks;
    this._onUserClick = this._onUserClick.bind(this);
  }

  get template() {
    return `
    <section class="calendar">
    <h2 class="visually-hidden">Календарь</h2>
    <table class="calendar__table">          
        ${getCalendarTemplate(
          this._calendarDate,
          this._tasksDate,
          this._todayDate,
          this._tasks
        )}  
    </table>
  </section>
    `;
  }

  _onUserClick(evt) {
    const cellDate = evt.target.dataset.date;
    if (cellDate) {
      this.onCellClick(cellDate);
    }
  }

  bind() {
    this._table = this.element.querySelector('.calendar__table');
    this._table.addEventListener('click', this._onUserClick);
  }

  unbind() {
    this._table.removeEventListener('click', this._onUserClick);
  }

  changeActiveCell(tasksDate) {
    const prevDate = deleteTimePart(this._tasksDate);
    const prevCell = this._table.querySelector(
      `.calendar__cell[data-date='${prevDate}']`
    );

    const newDate = deleteTimePart(tasksDate);
    const newCell = this._table.querySelector(
      `.calendar__cell[data-date='${newDate}']`
    );

    prevCell.dataset.active = false;
    newCell.dataset.active = true;
    this._tasksDate = tasksDate;
  }

  changeCalendar(newDate, tasksDate, todayDate, newTasks) {
    this.unrender();
    this._calendarDate = newDate;
    this._tasksDate = tasksDate;
    this._todayDate = todayDate;
    this._tasks = newTasks;
    this.render();
  }

  onCellClick() {}
}

export default CalendarView;
