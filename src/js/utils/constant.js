export const CALENDAR_DAYS_NAME = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const CALENDAR_ROW_AMOUNT = 6;
export const CALENDAR_COLUMN_AMOUNT = 7;
export const CALENDAR_DAY_AMOUNT = CALENDAR_COLUMN_AMOUNT * CALENDAR_ROW_AMOUNT;

export const DEFAULT_APP_STORAGE = {
  // month -> year -> day -> [tasks]
  '01': {},
  '02': {},
  '03': {},
  '04': {},
  '05': {},
  '06': {},
  '07': {},
  '08': {},
  '09': {},
  '10': {},
  '11': {},
  '12': {}
};

export const MONTH_MAP = {
  '01': { sub: 'Январь', dir: 'января' },
  '02': { sub: 'Февраль', dir: 'февраля' },
  '03': { sub: 'Март', dir: 'марта' },
  '04': { sub: 'Апрель', dir: 'апреля' },
  '05': { sub: 'Май', dir: 'мая' },
  '06': { sub: 'Июнь', dir: 'июня' },
  '07': { sub: 'Июль', dir: 'июля' },
  '08': { sub: 'Август', dir: 'августа' },
  '09': { sub: 'Сентябрь', dir: 'сентября' },
  '10': { sub: 'Октябрь', dir: 'октября' },
  '11': { sub: 'Ноябрь', dir: 'ноября' },
  '12': { sub: 'Декабрь', dir: 'Декабря' }
};

export const APP_KEY = 'TASKCALENDAR';

export const TASK_COLOR = {
  RED: 'red',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
  YELLOWGREEN: 'yellowgreen'
};

export const TASK_STATUS = {
  ACTIVE: 'active',
  DONE: 'done'
};

export const MARK_OPEN = '**|';
export const MARK_CLOSE = '|**';

export const ENTER_CODE = 'Enter';
export const ESC_CODE = 'Escape';
