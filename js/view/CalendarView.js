import AbstractView from './AbstractView';
import getCalendarTemplate from './calendarTemplate';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["bind","unbind",]}] */
class CalendarView extends AbstractView {
  constructor(chosenDate) {
    super();
    this._chosenDate = chosenDate;
  }

  get template() {
    return `
    <section class="calendar">
    <h2 class="visually-hidden">Календарь</h2>
    <table>          
        ${getCalendarTemplate(this._chosenDate)}           
    </table>
  </section>
    `;
  }

  bind() {}

  unbind() {}
}

export default CalendarView;
