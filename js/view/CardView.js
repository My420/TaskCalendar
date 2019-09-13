import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["changeCard"] }] */
class CardView extends AbstractView {
  constructor(task, parentElement) {
    super(parentElement);
    this._task = task;
    this._parentElement = parentElement;
    this._onUserClick = this._onUserClick.bind(this);
  }

  _onUserClick(evt) {
    const { action } = evt.target.dataset;
    if (action) {
      if (action === 'cancel') {
        this.unrender();
      } else if (action === 'change') {
        this.changeCard(this._task);
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

    return `<section class="card" data-action="cancel">
    <h2 class="visually-hidden">Просмотр задачи</h2>
    <div class="card__info" data-status=${taskStatus}>
        <div class="card__color" data-color=${taskColor} data-status=${taskStatus}></div>
        <span class="card__date">${taskDate}</span>
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
  }

  unbind() {
    this._card.removeEventListener('click', this._onUserClick);
    this._card = null;
  }

  changeCard() {}
}

export default CardView;
