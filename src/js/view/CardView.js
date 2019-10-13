import AbstractView from './AbstractView';
import getDisplayedDate from '../utils/getDisplayedDate';
import { ESC_CODE } from '../utils/constant';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["changeTask", "deleteTask", "onTaskDelete"] }] */
class CardView extends AbstractView {
  constructor(task, parentElement) {
    super(parentElement);
    this._task = task;
    this._parentElement = parentElement;
    this._onUserClick = this._onUserClick.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }

  _setFocus() {
    setTimeout(() => {
      this._card.querySelector('.card__button--change').focus();
    }, 50);
  }

  _onKeyUp(evt) {
    const { code } = evt;
    if (code === ESC_CODE) {
      this.unrender();
    }
  }

  _onUserClick(evt) {
    const { action } = evt.target.dataset;
    if (action) {
      if (action === 'cancel') {
        this.unrender();
      } else if (action === 'change') {
        this.changeTask(this._task);
      } else if (action === 'delete') {
        const { taskId, taskDate } = this._task;
        this.onTaskDelete(taskDate, taskId);
        this.unrender();
      }
    }
  }

  get template() {
    const {
      taskColor,
      taskName,
      taskDescription,
      taskDate,
      taskStatus
    } = this._task;

    const displayedDate = getDisplayedDate(taskDate, true);

    return `<section class="app__card card" data-action="cancel">
    <h2 class="visually-hidden">Просмотр задачи</h2>
    <div class="card__info" data-status=${taskStatus}>
        <div class="card__color" data-color=${taskColor} data-status=${taskStatus}></div>
        <span class="card__date">${displayedDate}</span>
        <span class="card__name">${taskName}</span>
        ${
          taskDescription.trim()
            ? `<span class="card__description">${taskDescription}</span>`
            : ''
        }
        <div class="card__controls">
            <button class="card__button card__button--change" type="button" data-action="change">
            Изменить
            </button>
            <button class="card__button card__button--delete" type="button" data-action="delete">
            Удалить
            </button>
            <button class="card__button card__button--cancel" type="button" data-action="cancel">
            Отменить
            </button>
        </div>
    </div>    
  </section>`;
  }

  bind() {
    this._card = this.element.querySelector('.card');
    this._card.addEventListener('click', this._onUserClick);
    this._card.addEventListener('keyup', this._onKeyUp);

    this._setFocus();
  }

  unbind() {
    this._card.removeEventListener('click', this._onUserClick);
    this._card.removeEventListener('keyup', this._onKeyUp);
  }

  changeTask() {}

  onTaskDelete() {}
}

export default CardView;
