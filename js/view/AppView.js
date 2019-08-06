import HeaderView from './HeaderView';
import CalendarView from './CalendarView';
import AbstractView from './AbstractView';
import TaskListView from './TaskListView';
import TaskView from './TaskView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCellClick", "onNewCardAdd"] }] */
class AppView extends AbstractView {
  constructor(calendarData, rootElement) {
    super(rootElement);
    this._allDates = calendarData.dates;
    this._calendarPeriodTasks = calendarData.tasks;
  }

  _findContainers() {
    this._taskContainer = this.element.querySelector('.container__task');
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
      this._calendarPeriodTasks,
      this._calendarContainer
    );
    this._tasks = new TaskListView(tasksDate, this._tasksContainer);
    this._task = new TaskView(this._taskContainer);
  }

  _setChildrenViewHendlerFunction() {
    this._header.onPrevButtonClick = this.onPrevButtonClick;
    this._header.onNextButtonClick = this.onNextButtonClick;
    this._calendar.onCellClick = this.onCellClick;
    this._task.onNewCardAdd = this.onNewCardAdd;
    this._header.onCreateButtonClick = () =>
      this._task.showCreateCard(this._allDates.tasksDate);
  }

  _renderChildrenView() {
    this._header.render();
    this._calendar.render();
    this._tasks.render();
  }

  get template() {
    return `<div class="container container__task"></div>
    <div class="container container__header"></div>
    <div class="container container__main">
    <main class="app__main">    
    <div class="container container__calendar"></div>
    <div class="container container__tasks"></div>
    </main>
    </div>
    <div class="container container__footer"></div>
    `;
  }

  bind() {
    this._findContainers();
    this._createChildrenView();
    this._setChildrenViewHendlerFunction();
    this._renderChildrenView();
  }

  changeCalendarDate(newDates, newTasks) {
    this._allDates = newDates;
    const { calendarDate, tasksDate } = this._allDates;
    this._header.changeDisplayedDate(calendarDate);
    this._calendar.changeCalendar(calendarDate, tasksDate, newTasks);
    this._tasks.changeTasks(tasksDate);
  }

  changeTasksDate(newDate) {
    this._allDates.tasksDate = newDate;
    this._calendar.changeActiveCell(newDate);
    this._tasks.changeTasks(newDate);
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}

  onCellClick() {}

  onNewCardAdd() {}
}

export default AppView;
