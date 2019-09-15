import AbstractView from './AbstractView';
import deleteTimePart from '../utils/deleteTimePart';
import generateID from '../utils/generateID';
import { TASK_COLOR, TASK_STATUS } from '../utils/constant';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onNewCardAdd", "onChangeCard","onTaskChange"] }] */
class CardEditView extends AbstractView {
  constructor(taskDate, parentElement, cardData = null) {
    super(parentElement);
    this._isChangeTask = !!cardData;
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
    if (this._isChangeTask) {
      const oldTask = this._cardData;
      const newTask = data;
      this.onTaskChange({ oldTask, newTask });
      this.unrender();
    } else {
      this.onNewCardAdd(data);
      this.unrender();
    }
  }

  get template() {
    const title = this._isChangeTask ? 'Изменить задачу' : 'Создать задачу';
    const id = this._isChangeTask ? this._cardData.taskId : generateID();
    const taskName = this._isChangeTask ? this._cardData.taskName : '';
    const taskDescription = this._isChangeTask
      ? this._cardData.taskDescription
      : '';
    const color = this._isChangeTask
      ? this._cardData.taskColor
      : TASK_COLOR.GREEN;
    const status = this._isChangeTask
      ? this._cardData.taskStatus
      : TASK_STATUS.ACTIVE;

    return `<section class="card-edit">
    <h2 class="visually-hidden">${title}</h2>
    <form class="card-edit__form form" action="somephpfile.php">
      <p class="form__title">${title}:</p>
      <fieldset class="form__field form__field--information">
        <legend class="form__legend form__legend--information visually-hidden">
          Основная информация
        </legend>
        <label for="id" class="form__label form__label--id visually-hidden">ID</label>
        <input
          id="id"
          class="form__id visually-hidden"
          type="text"
          name="taskId"
          value="${id}"
          required
          tabindex="-1"       
        />
        <div class='form__label-wrapper'>
        <label for="taskDate" class="form__label form__label--date"
          >Дата:</label
        >
        </div>
        <input
          id="taskDate"
          class="form__date"
          type="date"
          name="taskDate"
          value=${this._taskDate}
          required          
        />
        <div class='form__label-wrapper'>
        <label for="name" class="form__label form__label--name"
          >Задача:</label
        >
        </div>
        <input
          id="name"
          class="form__name"
          type="text"
          name="taskName"          
          value="${taskName}"         
          required          
        />
        <div class='form__label-wrapper'>
        <label
          for="description"
          class="form__label form__label--description"
          >Описание:</label
        >
        </div>
        <textarea
          id="description"
          class="form__description"
          name="taskDescription"
          placeholder="дополнительное описание"                 
        >${taskDescription}</textarea>
      </fieldset>

      <fieldset class="form__field form__field--colorPicker">
        <legend class="form__legend form__legend--colorPicker">
          Выбор цвета:
        </legend>
        <div class="form__inner form__inner--colorPicker">
        <input
          id="color-${TASK_COLOR.RED}"
          class="form__radio form__radio--red visually-hidden"
          type="radio"
          name="taskColor"
          value=${TASK_COLOR.RED}
          ${color === TASK_COLOR.RED ? 'checked' : ''}    
        />
        <label for="color-${
          TASK_COLOR.RED
        }" class="form__label form__label--colorPicker"
          ><span class="visually-hidden">Красный</span></label
        >
        <input
          id="color-${TASK_COLOR.ORANGE}"
          class="form__radio form__radio--orange visually-hidden"
          type="radio"
          name="taskColor"
          value=${TASK_COLOR.ORANGE}
          ${color === TASK_COLOR.ORANGE ? 'checked' : ''}  
        />
        <label
          for="color-${TASK_COLOR.ORANGE}"
          class="form__label form__label--colorPicker"
          ><span class="visually-hidden">Оранжевый</span></label
        >
        <input
          id="color-${TASK_COLOR.YELLOW}"
          class="form__radio form__radio--yellow visually-hidden"
          type="radio"
          name="taskColor"
          value=${TASK_COLOR.YELLOW}
          ${color === TASK_COLOR.YELLOW ? 'checked' : ''}  
        />
        <label
          for="color-${TASK_COLOR.YELLOW}"
          class="form__label form__label--colorPicker"
          ><span class="visually-hidden">Желтый</span></label
        >
        <input
          id="color-${TASK_COLOR.GREEN}"
          class="form__radio form__radio--green visually-hidden"
          type="radio"
          name="taskColor"
          value=${TASK_COLOR.GREEN}
          ${color === TASK_COLOR.GREEN ? 'checked' : ''}  
        />
        <label
          for="color-${TASK_COLOR.GREEN}"
          class="form__label form__label--colorPicker"
          ><span class="visually-hidden">Зеленый</span></label
        >
        <input
          id="color-${TASK_COLOR.YELLOWGREEN}"
          class="form__radio form__radio--yellowgreen visually-hidden"
          type="radio"
          name="taskColor"
          value=${TASK_COLOR.YELLOWGREEN}
          ${color === TASK_COLOR.YELLOWGREEN ? 'checked' : ''}  
        />
        <label
          for="color-${TASK_COLOR.YELLOWGREEN}"
          class="form__label form__label--colorPicker"
          ><span class="visually-hidden">Желто-зелёный</span></label
        >
        </div>  
      </fieldset>
      <fieldset class="form__field form__field--status">
        <legend class="form__legend form__legend--status">
          Статус:
        </legend>
        <div class="form__inner form__inner--status">
        <input
          id="status-${TASK_STATUS.ACTIVE}"
          class="form__radio form__radio--${TASK_STATUS.ACTIVE} visually-hidden"
          type="radio"
          name="taskStatus"
          value=${TASK_STATUS.ACTIVE}
          ${status === TASK_STATUS.ACTIVE ? 'checked' : ''}           
        />
        <label for="status-${
          TASK_STATUS.ACTIVE
        }" class="form__label form__label--${TASK_STATUS.ACTIVE}"
          >Активная</label
        >
        <input
          id="status-${TASK_STATUS.DONE}"
          class="form__radio form__radio--${TASK_STATUS.DONE} visually-hidden"
          type="radio"
          name="taskStatus"
          value=${TASK_STATUS.DONE}
          ${status === TASK_STATUS.DONE ? 'checked' : ''}  
        />
         <label for="status-${
           TASK_STATUS.DONE
         }" class="form__label form__label--${TASK_STATUS.DONE}"
          >Выполненная</label
        >
        </div>
      </fieldset>
      <fieldset class="form__field form__field--action">
      <legend class="form__legend form__legend--action visually-hidden">
        Действия:
      </legend>
      <div class="form__inner--action">
      <button class="form__button form__button--save" type="submit" data-action="save">
        Сохранить
      </button>
      <button class="form__button form__button--cancel" type="button" data-action="cancel">
        Отменить
      </button>
      </div>
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

  onNewCardAdd() {}

  onChangeCard() {}

  onTaskChange() {}
}

export default CardEditView;
