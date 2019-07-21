import AbstractView from './AbstractView';
import CardEditView from './CardEditView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","bind", unbind] }] */
class TaskView extends AbstractView {
  constructor(parentElement) {
    super(parentElement);
    this._parentElement = parentElement;
    this._cardEditView = CardEditView;
  }

  showCreateCard(taskDate) {
    this._taskDate = taskDate;
    this._currentView = new this._cardEditView(
      this._taskDate,
      this._parentElement
    );
    this._currentView.render();
  }

  bind() {}

  unbind() {}
}

export default TaskView;
