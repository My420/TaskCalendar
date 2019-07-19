import HeaderView from './HeaderView';
import CalendarView from './CalendarView';
import AbstractView from './AbstractView';
import TaskListView from './TaskListView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","onPrevButtonClick","onNextButtonClick","onSearchButtonClick"] }] */
class AppView extends AbstractView {
  constructor(allDates) {
    super();
    this._allDates = allDates;
    const { calendarDate, tasksDate } = this._allDates;
    this._rootElement = document.querySelector('.root');
    this._header = new HeaderView(calendarDate);
    this._calendar = new CalendarView(calendarDate);
    this._tasks = new TaskListView(tasksDate);
  }

  _renderHeader() {
    this._headerContainer.appendChild(this._header.render());
  }

  _renderCalendar() {
    this._calendarContainer.appendChild(this._calendar.render());
  }

  _renderTasks() {
    this._tasksContainer.appendChild(this._tasks.render());
  }

  _changeCalendar(newDate) {
    this._calendar.unrender();
    this._calendarContainer.innerHTML = ``;
    this._calendar = new CalendarView(newDate);
    this._renderCalendar();
  }

  _changeTasks(newDate) {
    this._tasks.unrender();
    this._tasksContainer.innerHTML = ``;
    this._tasks = new TaskListView(newDate);
    this._renderTasks();
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
    this._headerContainer = this._element.querySelector('.container__header');
    this._calendarContainer = this._element.querySelector(
      '.container__calendar'
    );
    this._tasksContainer = this._element.querySelector('.container__tasks');
    this._footerContainer = this._element.querySelector('.container__footer');
  }

  init() {
    this._rootElement.appendChild(this.render());

    this._header.onPrevButtonClick = this.onPrevButtonClick;
    this._header.onNextButtonClick = this.onNextButtonClick;
    this._renderHeader();
    this._renderCalendar();
    this._renderTasks();
  }

  changeCalendarDate(newDate) {
    this._allDates = newDate;
    const { calendarDate, tasksDate } = this._allDates;
    this._header.changeDisplayedDate(calendarDate);
    this._changeCalendar(calendarDate);
    this._changeTasks(tasksDate);
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}
}

export default AppView;
