import AbstractView from './AbstractView';
import hideKeyboard from '../utils/hideKeyboard';
import getDisplayedDate from '../utils/getDisplayedDate';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCreateButtonClick"]}] */
class HeaderView extends AbstractView {
  constructor(chosenDate, parentElement) {
    super(parentElement);
    this._chosenDate = chosenDate;
    this._onUserClick = this._onUserClick.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  get template() {
    const displayedDate = getDisplayedDate(this._chosenDate);

    return `<header class="app__header header">
      <h1 class="visually-hidden">Календарь задач</h1>
      <p class="header__logo">TaskCalendar</p>
      <nav class="header__navigation">
      <div class="header__cover">
      <button class="header__button header__button--create" data-target="create">
        <span class="visually-hidden">Создать задачу</span>+</button>
      <div class="header__navigation-wrapper">
      <button class="header__button header__button--prev" data-target="prev">
        <span class="visually-hidden">Предыдущий месяц</span><</button>
      <p class="header__screen">${displayedDate}</p>
      <button class="header__button header__button--next" data-target="next">
        <span class="visually-hidden">Следующий месяц</span>></button>
      </div>
      </div>
      <div class="header__search-wrapper">
        <form class="header__form" action="somephpfile.php">
          <div class="header__form-inner">
            <input class="header__search" type="text" minlength="3" placeholder="поиск..." required/>
            <button class="header__button header__button--search" type="submit">
              <span class="visually-hidden">Поиск</span>
              <svg width="100%" height="100%" viewBox="0 0 24 24">
                <path
                  class='header__path'
                  d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      </nav>
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
    const displayedDate = getDisplayedDate(this._chosenDate);
    this._dateScreen.innerHTML = displayedDate;
  }

  bind() {
    this._header = this.element.querySelector('.app__header');
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
