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
});
