import AbstractView from './AbstractView';
import CardEditView from './CardEditView';
import CardView from './CardView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","bind", "unbind", "onNewCardAdd"] }] */
class ModalView extends AbstractView {
  constructor(parentElement) {
    super(parentElement);
    this._parentElement = parentElement;
    this._cardEditView = CardEditView;
    this._cardView = CardView;
  }

  showCreateCard(taskDate) {
    this._currentView = new this._cardEditView(taskDate, this._parentElement);
    this._currentView.onNewCardAdd = this.onNewCardAdd;
    this._currentView.render();
  }

  showTaskCard(task) {
    this._currentView = new this._cardView(task, this._parentElement);
    this._currentView.render();
  }

  bind() {}

  unbind() {}

  onNewCardAdd() {}
}

export default ModalView;
