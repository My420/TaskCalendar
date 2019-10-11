import AppDate from './AppDate';

describe('App Date class works correct', () => {
  let appDate;

  beforeEach(() => {
    appDate = new AppDate();
  });

  test('todayDate is Date Object', () => {
    const { _todayDate } = appDate;
    expect(_todayDate.constructor.name).toBe('Date');
  });

  test('calendarDate is Date Object', () => {
    const { _calendarDate } = appDate;
    expect(_calendarDate.constructor.name).toBe('Date');
  });

  test('tasksDate is Date Object', () => {
    const { _tasksDate } = appDate;
    expect(_tasksDate.constructor.name).toBe('Date');
  });

  test('setNextMonth should work correct', () => {
    const currentMonth = appDate._calendarDate.getMonth();
    appDate.setNextMonth();
    const newMonth = appDate._calendarDate.getMonth();
    expect(newMonth).toBe(currentMonth + 1);
  });

  test('setPrevMonth should work correct', () => {
    const currentMonth = appDate._calendarDate.getMonth();
    appDate.setPrevMonth();
    const newMonth = appDate._calendarDate.getMonth();
    expect(newMonth).toBe(currentMonth - 1);
  });

  test('all AppDate geter must return string', () => {
    expect(typeof appDate.calendarDate).toBe('string');
    expect(typeof appDate.todayDate).toBe('string');
    expect(typeof appDate.tasksDate).toBe('string');
  });

  test('setTasksDate should work correct', () => {
    const newDate = '2019-09-12T00:00:00.000Z';
    appDate.setTasksDate(newDate);
    expect(appDate._tasksDate.toJSON()).toBe('2019-09-12T00:00:00.000Z');
  });

  test('setCalendarDate should work correct', () => {
    const newDate = '2019-09-12T00:00:00.000Z';
    appDate.setCalendarDate(newDate);
    expect(appDate._calendarDate.toJSON()).toBe('2019-09-01T00:00:00.000Z');
  });

  test('get tasksDate should consider local time zone', () => {
    const date = appDate.tasksDate;
    const hours = appDate._tasksDate.getHours();
    expect(+date.slice(11, 13)).toBe(hours);
  });

  test('get calendarDate should consider local time zone', () => {
    const date = appDate.calendarDate;
    const hours = appDate._calendarDate.getHours();
    expect(+date.slice(11, 13)).toBe(hours);
  });

  test('get todayDate should consider local time zone', () => {
    const date = appDate.todayDate;
    const hours = appDate._todayDate.getHours();
    expect(+date.slice(11, 13)).toBe(hours);
  });
});
