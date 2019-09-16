import AbstractView from './AbstractView';
import hideKeyboard from '../utils/hideKeyboard';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCreateButtonClick"]}] */
class HeaderView extends AbstractView {
  constructor(chosenDate, parentElement) {
    super(parentElement);
    this._chosenDate = chosenDate;
    this._onUserClick = this._onUserClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  get template() {
    return `<header class="app-header header">
      <h1 class="visually-hidden">Календарь задач</h1>
      <p class="header__logo">TaskCalendar</p>
      <div class="header__inner">
      <div class="header__cover">
      <button class="header__button header__button--create" data-target="create">
        <span class="visually-hidden">Создать задачу</span>+</button>
      <div class="header__navigation-wrapper">
      <button class="header__button header__button--prev" data-target="prev">
        <span class="visually-hidden">Предыдущий месяц</span><</button>
      <p class="header__screen">${this._chosenDate}</p>
      <button class="header__button header__button--next" data-target="next">
        <span class="visually-hidden">Следующий месяц</span>></button>
      </div>
      </div>
      <div class="header__search-wrapper">
        <form class="header__form" action="somephpfile.php">
          <input class="header__search" type="text" minlength="3" placeholder="поиск..." />
          <button class="header__button header__button--search" type="submit">
          <span class="visually-hidden">Поиск</span>&#128269</button>
        </form>
      </div>
      </div>
    </header>`;
  }

  _onSubmit(evt) {
    evt.preventDefault();
    const text = this._input.value;
    this.onSearchButtonClick(text);
    hideKeyboard(this._input);
  }

  _onUserClick(evt) {
    const button = evt.target.dataset.target;
    if (button === `prev`) {
      this.onPrevButtonClick();
    } else if (button === `next`) {
      this.onNextButtonClick();
    } else if (button === `create`) {
      this.onCreateButtonClick();
    }
  }

  changeDisplayedDate(newDate) {
    this._chosenDate = newDate;
    this._dateScreen.innerHTML = this._chosenDate;
  }

  bind() {
    this._header = this.element.querySelector('.app-header');
    this._header.addEventListener('click', this._onUserClick);
    this._dateScreen = this.element.querySelector('.header__screen');
    this._form = this.element.querySelector('.header__form');
    this._form.addEventListener('submit', this._onSubmit);
    this._input = this.element.querySelector('.header__search');
  }

  unbind() {
    this._header.removeEventListener('click', this._onUserClick);
    this._form.removeEventListener('submit', this._onSubmit);
    this._header = null;
    this._dateScreen = null;
    this._form = null;
    this._input = null;
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}

  onCreateButtonClick() {}
}

export default HeaderView;
