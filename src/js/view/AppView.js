import HeaderView from './HeaderView';
import CalendarView from './CalendarView';
import AbstractView from './AbstractView';
import TaskListView from './TaskListView';
import ModalView from './ModalView';
import FooterView from './FooterView';
import deleteTimePart from '../utils/deleteTimePart';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onResultClick","template","onTaskDelete","onTaskChange","onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCellClick", "onNewTaskAdd", "onTaskClick"] }] */
class AppView extends AbstractView {
  constructor(calendarData, rootElement) {
    super(rootElement);
    this._allDates = calendarData.dates;
    this._calendarPeriodTasks = calendarData.tasks;
  }

  _getTasksForTasksList(taskDate) {
    const date = deleteTimePart(taskDate);
    const tasks = this._calendarPeriodTasks[date];
    return tasks;
  }

  _findContainers() {
    this._modalContainer = this.element.querySelector('.container__modal');
    this._headerContainer = this.element.querySelector('.container__header');
    this._calendarContainer = this.element.querySelector(
      '.container__calendar'
    );
    this._tasksContainer = this.element.querySelector('.container__tasks');
    this._footerContainer = this.element.querySelector('.container__footer');
  }

  _createChildrenView() {
    const { calendarDate, tasksDate, todayDate } = this._allDates;
    const tasks = this._getTasksForTasksList(tasksDate);
    this._header = new HeaderView(calendarDate, this._headerContainer);
    this._calendar = new CalendarView(
      calendarDate,
      tasksDate,
      todayDate,
      this._calendarPeriodTasks,
      this._calendarContainer
    );
    this._tasks = new TaskListView(tasks, this._tasksContainer);
    this._modal = new ModalView(this._modalContainer);
    this._footer = new FooterView(this._footerContainer);
  }

  _setChildrenViewHendlerFunction() {
    this._header.onPrevButtonClick = this.onPrevButtonClick;
    this._header.onNextButtonClick = this.onNextButtonClick;
    this._header.onSearchButtonClick = this.onSearchButtonClick;
    this._header.onCreateButtonClick = () =>
      this._modal.showCreateCard(this._allDates.tasksDate);

    this._calendar.onCellClick = this.onCellClick;
    this._modal.onNewTaskAdd = this.onNewTaskAdd;
    this._modal.onTaskDelete = this.onTaskDelete;
    this._modal.onTaskChange = this.onTaskChange;
    this._modal.onResultClick = this.onResultClick;
    this._tasks.onTaskClick = this.onTaskClick;
    this._tasks.onTaskChange = this.onTaskChange;
  }

  _renderChildrenView() {
    this._header.render();
    this._calendar.render();
    this._tasks.render();
    this._footer.render();
  }

  get template() {
    return `<div class="container container__modal"></div>
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
    this._calendarPeriodTasks = newTasks;
    const { calendarDate, tasksDate, todayDate } = this._allDates;
    this._header.changeDisplayedDate(calendarDate);
    this._calendar.changeCalendar(
      calendarDate,
      tasksDate,
      todayDate,
      this._calendarPeriodTasks
    );

    this._tasks.changeTasks(this._getTasksForTasksList(tasksDate));
  }

  addTask(task) {
    this._calendar.addTaskToCell(task);
    this._tasks.addTaskToList(task);
  }

  changeTasksDate(newTaskDate, dayTasks) {
    this._allDates.tasksDate = newTaskDate;
    this._calendar.changeActiveCell(newTaskDate);
    this._tasks.changeTasks(dayTasks);
  }

  showTaskCard(task) {
    this._modal.showTaskCard(task);
  }

  deleteTask(taskDate, taskId) {
    this._calendar.deleteTaskFromCell(taskDate, taskId);
    this._tasks.deleteTaskFromList(taskId);
  }

  changeTask(newTask) {
    this._calendar.changeTaskInCell(newTask);
    this._tasks.changeTask(newTask);
  }

  migrateTask(data) {
    const { deletedTask, addedTask } = data;
    const { taskDate, taskId } = deletedTask;
    this.deleteTask(taskDate, taskId);
    this._calendar.addTaskToCell(addedTask);
  }

  showLoading() {
    this._modal.showLoading();
  }

  showSearchResults(results) {
    this._modal.showSearchResults(results);
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}

  onNewTaskAdd() {}

  onTaskDelete() {}

  onTaskChange() {}

  onResultClick() {}

  onCellClick() {}

  onTaskClick() {}
}

export default AppView;
