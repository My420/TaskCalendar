import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["bind","unbind"]}] */
class TaskListView extends AbstractView {
  constructor(listDate) {
    super();
    this._listDate = listDate;
  }

  get template() {
    return `
      <section class="taskList">
      <h2 class="visually-hidden">Список дел</h2>
      <p class="taskList__date">${this._listDate}</p>      
    </section>
      `;
  }

  bind() {}

  unbind() {}
}

export default TaskListView;