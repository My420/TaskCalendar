import dateToObject from './dateToObject';
import deleteTimePart from './deleteTimePart';
import { MONTH_MAP } from './constant';

const getDisplayedDate = (stringDate, isFull = false) => {
  const { year, month, date } = dateToObject(deleteTimePart(stringDate));

  return isFull
    ? `${date} ${MONTH_MAP[month].dir} ${year}`
    : `${MONTH_MAP[month].sub} ${year}`;
};

export default getDisplayedDate;
