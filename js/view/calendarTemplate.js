import calendarDayTemplate from './calendarDayTemplate';
import setDayOnMonday from '../utils/setDayOnMonday';
import getTableHeader from './calendarTableHeader';
import { CALENDAR_ROW_AMOUNT, CALENDAR_COLUMN_AMOUNT } from '../utils/constant';

const getCalendarTemplate = (calendarDate, tasksDate, tasks) => {
  const date = new Date(calendarDate);

  setDayOnMonday(date);

  let template = getTableHeader();

  for (let i = 0; i < CALENDAR_ROW_AMOUNT; i += 1) {
    template += `<tr class="calendar__row">`;

    for (let j = 0; j < CALENDAR_COLUMN_AMOUNT; j += 1) {
      template += calendarDayTemplate(date.toJSON(), tasksDate, tasks);
      date.setDate(date.getDate() + 1);
    }
    template += `</tr>`;
  }

  return template;
};

export default getCalendarTemplate;
