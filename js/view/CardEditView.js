import AbstractView from './AbstractView';
import deleteTimePart from '../utils/deleteTimePart';
import generateID from '../utils/generateID';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getCardData"] }] */
class CardEditView extends AbstractView {
  constructor(taskDate, parentElement, cardData = null) {
    super(parentElement);
    this._taskDate = deleteTimePart(taskDate);
    this._parentElement = parentElement;
    this._cardData = cardData;
    this._onCancelButtonClick = this._onCancelButtonClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  _getFormData() {
    const data = new FormData(this._form);
    const cardData = {};
    data.forEach((value, name) => {
      cardData[name] = value;
    });

    return cardData;
  }

  _onCancelButtonClick() {
    this.unrender();
  }

  _onSubmit(evt) {
    evt.preventDefault();
    const data = this._getFormData();
    this.getCardData(data);
    this.unrender();
  }

  get template() {
    return `<section class="card-edit">
    <h2 class="visually-hidden">Создать задачу</h2>
    <form class="card-edit__form form" action="somephpfile.php">
      <p class="form__title">Создать задачу:</p>
      <fieldset class="form__field form__field--information">
        <legend class="form__legend form__legend--information">
          Основная информация
        </legend>
        <label for="id" class="form__legend form__legend--id">ID</label>
        <input
          id="id"
          class="form__id"
          type="text"
          name="taskId"
          value="${generateID()}"
          required          
        />
        <label for="taskDate" class="form__legend form__legend--date"
          >Дата:</label
        >
        <input
          id="taskDate"
          class="form__date"
          type="date"
          name="taskDate"
          value=${this._taskDate}
          required
        />
        <label for="name" class="form__legend form__legend--name"
          >Задача:</label
        >
        <input
          id="name"
          class="form__name"
          type="text"
          name="taskName"
          placeholder="что нужно сделать"
          required
        />

        <label
          for="description"
          class="form__legend form__legend--description"
          >Описание:</label
        >
        <textarea
          id="description"
          class="form__description"
          name="taskDescription"
          placeholder="дополнительное описание"
        ></textarea>
      </fieldset>

      <fieldset class="form__field form__field--colorPicker">
        <legend class="form__legend form__legend--colorPicker">
          Выбор цвета
        </legend>
        <label for="color-red" class="form__legend form__legend--colorPicker"
          >Красный</label
        >
        <input
          id="color-red"
          class="form__radio form__radio--red"
          type="radio"
          name="taskColor"
          value="red"
        />

        <label
          for="color-orange"
          class="form__legend form__legend--colorPicker"
          >Оранжевый</label
        >
        <input
          id="color-orange"
          class="form__radio form__radio--orange"
          type="radio"
          name="taskColor"
          value="orange"
        />

        <label
          for="color-yellow"
          class="form__legend form__legend--colorPicker"
          >Желтый</label
        >
        <input
          id="color-yellow"
          class="form__radio form__radio--yellow"
          type="radio"
          name="taskColor"
          value="yellow"
        />

        <label
          for="color-green"
          class="form__legend form__legend--colorPicker"
          >Зеленый</label
        >
        <input
          id="color-green"
          class="form__radio form__radio--green"
          type="radio"
          name="taskColor"
          value="green"
          checked
        />

        <label
          for="color-yellowgreen"
          class="form__legend form__legend--colorPicker"
          >Желто-зелёный</label
        >
        <input
          id="color-yellowgreen"
          class="form__radio form__radio--yellowgreen"
          type="radio"
          name="taskColor"
          value="yellowgreen"
        />
      </fieldset>
      <fieldset class="form__field form__field--status">
        <legend class="form__legend form__legend--status">
          Статус
        </legend>
        <label for="status-active" class="form__legend form__legend--active"
          >Активная</label
        >
        <input
          id="status-active"
          class="form__radio form__radio--active"
          type="radio"
          name="taskStatus"
          value="active"
          checked
        />

        <label for="status-done" class="form__legend form__legend--done"
          >Выполненная</label
        >
        <input
          id="status-done"
          class="form__radio form__radio--done"
          type="radio"
          name="taskStatus"
          value="done"
        />
      </fieldset>
      <fieldset class="form__field form__field--action">
      <legend class="form__legend form__legend--action visually-hidden">
        Действия:
      </legend>
      <button class="form__button form__button--save" type="submit" data-action="save">
        Сохранить
      </button>
      <button class="form__button form__button--cancel" type="button" data-action="cancel">
        Отменить
      </button>
      </fieldset>
    </form>
  </section>`;
  }

  bind() {
    this._form = this.element.querySelector('.form');
    this._form.addEventListener('submit', this._onSubmit);

    this._cancelButton = this.element.querySelector('.form__button--cancel');
    this._cancelButton.addEventListener('click', this._onCancelButtonClick);
  }

  unbind() {
    this._cancelButton.removeEventListener('click', this._onCancelButtonClick);
    this._cancelButton = null;

    this._form.removeEventListener('submit', this._onSubmit);
    this._form = null;
  }

  getCardData() {}
}

export default CardEditView;
