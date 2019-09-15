import AbstractView from './AbstractView';
import getCalendarTemplate from './calendarTemplate';
import deleteTimePart from '../utils/deleteTimePart';
import calendarDayTasksTemplate from './calendarDayTasksTemplate';

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

  _findTasksContainerByDate(date) {
    const cell = this._table.querySelector(
      `.calendar__cell[data-date='${date}']`
    );
    const tasksContainer = cell.querySelector('.calendar__task-wrapper');
    return tasksContainer;
  }

  _findTask(date, id) {
    const tasksContainer = this._findTasksContainerByDate(date);
    const task = tasksContainer.querySelector(
      `.calendar__task[data-id="${id}"]`
    );
    return task;
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

  addTaskToCell(task) {
    const { taskDate } = task;
    const newTaskTemplate = calendarDayTasksTemplate([task]);
    const tasksContainer = this._findTasksContainerByDate(taskDate);
    tasksContainer.insertAdjacentHTML('beforeend', newTaskTemplate);
  }

  deleteTaskFromCell(taskDate, taskId) {
    const task = this._findTask(taskDate, taskId);
    task.remove();
  }

  changeTaskInCell(newTask) {
    const { taskDate, taskId, taskStatus, taskColor } = newTask;
    const task = this._findTask(taskDate, taskId);
    task.dataset.color = taskColor;
    task.dataset.status = taskStatus;
  }

  onCellClick() {}
}

export default CalendarView;
