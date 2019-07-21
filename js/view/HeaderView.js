import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onPrevButtonClick","onNextButtonClick","onSearchButtonClick","onCreateButtonClick"]}] */
class HeaderView extends AbstractView {
  constructor(chosenDate, parentElement) {
    super(parentElement);
    this._chosenDate = chosenDate;
    this.onUserClick = this.onUserClick.bind(this);
  }

  get template() {
    return `<header class="app-header header">
      <h1 class="visually-hidden">Календарь задач</h1>
      <p class="header__logo">TaskCalendar</p>
      <button class="header__button header__button--create" data-target="create">
        <span class="visually-hidden">Создать задачу</span>Создать
      </button>
      <button class="header__button header__button--prev" data-target="prev">
        <span class="visually-hidden">Предыдущий месяц</span>Prev
      </button>
      <p class="header__screen">${this._chosenDate}</p>
      <button class="header__button header__button--next" data-target="next">
        <span class="visually-hidden">Следующий месяц</span>Next
      </button>
      <input class="header__search" type="text" placeholder="поиск..." />
      <button class="header__button header__button--search" data-target="search">
        <span class="visually-hidden">Поиск</span>Поиск
      </button>
    </header>`;
  }

  onUserClick(evt) {
    const button = evt.target.dataset.target;
    if (button === `prev`) {
      this.onPrevButtonClick();
    } else if (button === `next`) {
      this.onNextButtonClick();
    } else if (button === `search`) {
      this.onSearchButtonClick();
    } else if (button === `create`) {
      this.onCreateButtonClick();
    }
  }

  changeDisplayedDate(newDate) {
    this._chosenDate = newDate;
    this._dateScreen.innerHTML = this._chosenDate;
  }

  bind() {
    this.element
      .querySelector('.app-header')
      .addEventListener('click', this.onUserClick);
    this._dateScreen = this.element.querySelector('.header__screen');
  }

  unbind() {
    this.element
      .querySelector('.app-header')
      .removeEventListener('click', this.onUserClick);
    this._dateScreen = null;
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}

  onCreateButtonClick() {}
}

export default HeaderView;
