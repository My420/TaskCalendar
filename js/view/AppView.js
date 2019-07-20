import HeaderView from './HeaderView';
import CalendarView from './CalendarView';
import AbstractView from './AbstractView';
import TaskListView from './TaskListView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCellClick"] }] */
class AppView extends AbstractView {
  constructor(allDates, rootElement) {
    super(rootElement);
    this._allDates = allDates;
  }

  _findContainers() {
    this._headerContainer = this.element.querySelector('.container__header');
    this._calendarContainer = this.element.querySelector(
      '.container__calendar'
    );
    this._tasksContainer = this.element.querySelector('.container__tasks');
    this._footerContainer = this.element.querySelector('.container__footer');
  }

  _createChildrenView() {
    const { calendarDate, tasksDate } = this._allDates;
    this._header = new HeaderView(calendarDate, this._headerContainer);
    this._calendar = new CalendarView(
      calendarDate,
      tasksDate,
      this._calendarContainer
    );
    this._tasks = new TaskListView(tasksDate, this._tasksContainer);
  }

  _setChildrenViewHendlerFunction() {
    this._header.onPrevButtonClick = this.onPrevButtonClick;
    this._header.onNextButtonClick = this.onNextButtonClick;
    this._calendar.onCellClick = this.onCellClick;
  }

  _renderChildrenView() {
    this._header.render();
    this._calendar.render();
    this._tasks.render();
  }

  get template() {
    return `<div class="container container__header"></div>
    <main class="app__main">
    <div class="container container__calendar"></div>
    <div class="container container__tasks"></div>
    </main>
    <div class="container container__footer"></div>
    `;
  }

  bind() {
    this._findContainers();
    this._createChildrenView();
    this._setChildrenViewHendlerFunction();
    this._renderChildrenView();
  }

  changeCalendarDate(newDate) {
    this._allDates = newDate;
    const { calendarDate, tasksDate } = this._allDates;
    this._header.changeDisplayedDate(calendarDate);
    this._calendar.changeCalendar(calendarDate, tasksDate);
    this._tasks.changeTasks(tasksDate);
  }

  changeTasksDate(newDate) {
    this._calendar.changeActiveCell(newDate);
    this._tasks.changeTasks(newDate);
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}

  onCellClick() {}
}

export default AppView;
