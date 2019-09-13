import AbstractView from './AbstractView';
import taskItemTemplate from './taskItemTemplate';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onTaskClick",""]}] */
class TaskListView extends AbstractView {
  constructor(tasks, parentElement) {
    super(parentElement);
    this._tasks = tasks;
    this._isEmpty = false;
    this._onUserClick = this._onUserClick.bind(this);
  }

  _getListTemplate() {
    if (this._tasks) {
      const template = this._tasks
        .map(elem => {
          return taskItemTemplate(elem);
        })
        .join('');

      return template;
    }
    this._isEmpty = true;
    return '<li class="taskList__message">На сегодня задач нет</li>';
  }

  _deleteEmptyMessage() {
    this._taskList.querySelector('.taskList__message').remove();
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
    this._tasks = newTasks;
    this._isEmpty = false;
    this.render();
  }

  addTaskToList(task) {
    if (this._isEmpty) {
      this._deleteEmptyMessage();
      this._isEmpty = false;
    }
    const newTask = taskItemTemplate(task);
    this._taskList.insertAdjacentHTML('beforeend', newTask);
  }

  bind() {
    this._taskList = this.element.querySelector('.taskList__list');
    this._taskList.addEventListener('click', this._onUserClick);
  }

  unbind() {
    this._taskList.removeEventListener('click', this._onUserClick);
  }

  onTaskClick() {}
}

export default TaskListView;
