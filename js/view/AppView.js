import HeaderView from './HeaderView';
import CalendarView from './CalendarView';
import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","onPrevButtonClick","onNextButtonClick","onSearchButtonClick"] }] */
class AppView extends AbstractView {
  constructor(chosenDate) {
    super();
    this._rootElement = document.querySelector('.root');
    this._header = new HeaderView(chosenDate);
    this._calendar = new CalendarView(chosenDate);
  }

  _renderHeader() {
    this._headerContainer.appendChild(this._header.render());
  }

  _renderCalendar() {
    this._calendarContainer.appendChild(this._calendar.render());
  }

  _changeCalendar(newDate) {
    this._calendar.unrender();
    this._calendarContainer.innerHTML = ``;
    this._calendar = new CalendarView(newDate);
    this._renderCalendar();
  }

  get template() {
    return `<div class="container container__header"></div>
    <main class="app__main">
    <div class="container container__calendar"></div>
    <div class="container container__tasks"></div>
    </main>
    <div class="container container__footer"></div>
    `;
  }

  bind() {
    this._headerContainer = this._element.querySelector('.container__header');
    this._calendarContainer = this._element.querySelector(
      '.container__calendar'
    );
    this._tasksContainer = this._element.querySelector('.container__tasks');
    this._footerContainer = this._element.querySelector('.container__footer');
  }

  init() {
    this._rootElement.appendChild(this.render());

    this._header.onPrevButtonClick = this.onPrevButtonClick;
    this._header.onNextButtonClick = this.onNextButtonClick;
    this._renderHeader();
    this._renderCalendar();
  }

  changeCalendarDate(newDate) {
    this._header.changeDisplayedDate(newDate);
    this._changeCalendar(newDate);
  }

  onPrevButtonClick() {}

  onNextButtonClick() {}

  onSearchButtonClick() {}
}

export default AppView;
