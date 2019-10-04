import AbstractView from './AbstractView';
import taskItemTemplate from './taskItemTemplate';
import findTaskIndex from '../utils/findTaskIndex';
import createElement from '../utils/createElement';
import { ENTER_CODE } from '../utils/constant';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onTaskClick",""]}] */
class TaskListView extends AbstractView {
  constructor(tasks, parentElement) {
    super(parentElement);
    this._tasks = tasks || [];
    this._emptyMessageTemplate = '<li class="taskList__message">задач нет</li>';
    this._onUserClick = this._onUserClick.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }

  _findTask(id) {
    return this._taskList.querySelector(`.taskList__item[data-id="${id}"]`);
  }

  _getListTemplate() {
    if (this._tasks.length > 0) {
      const template = this._tasks
        .map(elem => {
          return taskItemTemplate(elem);
        })
        .join('');

      return template;
    }

    return this._emptyMessageTemplate;
  }

  _deleteEmptyMessage() {
    this._taskList.querySelector('.taskList__message').remove();
  }

  _showEmptyMessage() {
    this._taskList.insertAdjacentHTML('beforeend', this._emptyMessageTemplate);
  }

  _onKeyUp(evt) {
    const { code } = evt;
    if (code === ENTER_CODE) {
      this._onUserClick(evt);
    }
  }

  _onUserClick(evt) {
    if (evt.target.className === 'taskList__screen') {
      const { date } = evt.target.dataset;
      const { id } = evt.target.dataset;
      this.onTaskClick(date, id);
    }
  }

  get template() {
    return `
      <section class="taskList">
      <h2 class="visually-hidden">Список дел</h2>
      <ul class="taskList__list">${this._getListTemplate()}</ul>     
    </section>
      `;
  }

  changeTasks(newTasks) {
    this.unrender();
    this._tasks = newTasks || [];
    this.render();
  }

  addTaskToList(task) {
    if (this._tasks.length === 0) {
      this._deleteEmptyMessage();
    }
    this._tasks.push(task);
    const newTask = taskItemTemplate(task);
    this._taskList.insertAdjacentHTML('beforeend', newTask);
  }

  deleteTaskFromList(taskId) {
    const task = this._findTask(taskId);
    task.remove();
    const deleteTaskIndex = findTaskIndex(this._tasks, taskId);
    this._tasks.splice(deleteTaskIndex, 1);
    if (this._tasks.length === 0) {
      this._showEmptyMessage();
    }
  }

  changeTask(newTask) {
    const { taskId } = newTask;
    const newTaskElement = createElement(taskItemTemplate(newTask));
    const oldTaskElement = this._findTask(taskId);
    oldTaskElement.replaceWith(newTaskElement);
  }

  bind() {
    this._taskList = this.element.querySelector('.taskList__list');
    this._taskList.addEventListener('click', this._onUserClick);
    this._taskList.addEventListener('keyup', this._onKeyUp);
  }

  unbind() {
    this._taskList.removeEventListener('click', this._onUserClick);
    this._taskList.removeEventListener('keyup', this._onKeyUp);
  }

  onTaskClick() {}
}

export default TaskListView;
