import HeaderView from './HeaderView';
import CalendarView from './CalendarView';
import AbstractView from './AbstractView';
import TaskListView from './TaskListView';
import ModalView from './ModalView';
import deleteTimePart from '../utils/deleteTimePart';
import compareUpToMonth from '../utils/compareUpToMonth';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","onTaskDelete","onTaskChange","onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCellClick", "onNewTaskAdd", "onTaskClick"] }] */
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
    this._tasks.onTaskClick = this.onTaskClick;
  }

  _renderChildrenView() {
    this._header.render();
    this._calendar.render();
    this._tasks.render();
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
    const newTaskDate = addedTask.taskDate;
    const { taskDate, taskId } = deletedTask;
    this.deleteTask(taskDate, taskId);
    if (compareUpToMonth(taskDate, newTaskDate)) {
      this._calendar.addTaskToCell(addedTask);
    }
  }

  // header
  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}

  // modal
  onNewTaskAdd() {}

  onTaskDelete() {}

  onTaskChange() {}

  // calendar
  onCellClick() {}

  // taskList
  onTaskClick() {}
}

export default AppView;
