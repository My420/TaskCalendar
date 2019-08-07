export const CALENDAR_DAYS_NAME = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const CALENDAR_ROW_AMOUNT = 5;
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
