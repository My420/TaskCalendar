import AbstractView from './AbstractView';
import CardEditView from './CardEditView';
import CardView from './CardView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","bind", "unbind", "onNewCardAdd","onTaskDelete","onTaskChange"] }] */
class ModalView extends AbstractView {
  constructor(parentElement) {
    super(parentElement);
    this._parentElement = parentElement;
    this._cardEditView = CardEditView;
    this._cardView = CardView;
    this.changeTask = this.changeTask.bind(this);
  }

  showCreateCard(taskDate, taskData = null) {
    this._currentView = new this._cardEditView(
      taskDate,
      this._parentElement,
      taskData
    );
    this._currentView.onNewCardAdd = this.onNewCardAdd;
    this._currentView.onTaskChange = this.onTaskChange;
    this._currentView.render();
  }

  showTaskCard(task) {
    this._currentView = new this._cardView(task, this._parentElement);
    this._currentView.onTaskDelete = this.onTaskDelete;
    this._currentView.changeTask = this.changeTask;
    this._currentView.render();
  }

  changeTask(task) {
    this._currentView.unrender();
    const { taskDate } = task;
    this.showCreateCard(taskDate, task);
  }

  bind() {}

  unbind() {}

  onNewCardAdd() {}

  onTaskDelete() {}

  onTaskChange() {}
}

export default ModalView;
