import AbstractView from './AbstractView';
import taskItemTemplate from './taskItemTemplate';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["bind","unbind"]}] */
class TaskListView extends AbstractView {
  constructor(tasks, parentElement) {
    super(parentElement);
    this._tasks = tasks;
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

    return '<p class="taskList__message">На сегодня задач нет</p >';
  }

  get template() {
    return `
      <section class="taskList">
      <h2 class="visually-hidden">Список дел</h2>
      <ul class="taskList__list">${this._getListTemplate()}</ul>     
    </section>
      `;
  }

  changeTasks(newTaks) {
    this.unrender();
    this._tasks = newTaks;
    this.render();
  }

  bind() {}

  unbind() {}
}

export default TaskListView;
