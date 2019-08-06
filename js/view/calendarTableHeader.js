import { CALENDAR_DAYS_NAME } from '../utils/constant';

const getTableHeader = () => {
  const template = `<tr class="calendar__row">
        ${CALENDAR_DAYS_NAME.map(elem => {
          return `<th class="calendar__header">${elem}</th>`;
        }).join('')}
    </tr>`;

  return template;
};

export default getTableHeader;
