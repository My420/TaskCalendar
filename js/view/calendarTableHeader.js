import { CALENDAR_DAYS_NAME } from '../utils/constant';

const getTableHeader = () => {
  const template = `<tr class="table__row">
        ${CALENDAR_DAYS_NAME.map(elem => {
          return `<th class="table__header">${elem}</th>`;
        }).join('')}
    </tr>`;

  return template;
};

export default getTableHeader;
