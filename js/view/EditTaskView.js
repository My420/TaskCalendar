import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","bind", unbind] }] */
class EditTaskView extends AbstractView {
  constructor(taskDate, parentElement, taskData = null) {
    super(parentElement);
    this._taskDate = taskDate;
    this._taskData = taskData;
  }

  get template() {
    return `<span`;
  }

  bind() {}

  unbind() {}
}

export default EditTaskView;
