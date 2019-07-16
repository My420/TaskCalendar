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

  test('chosenDate is Date Object', () => {
    const { _chosenDate } = appDate;
    expect(_chosenDate.constructor.name).toBe('Date');
  });

  test('setNextMonth works correct', () => {
    const currentMonth = new Date().getMonth();
    appDate.setNextMonth();
    expect(appDate.chosenDate.getMonth()).toBe(currentMonth + 1);
    appDate.setNextMonth();
    expect(appDate.chosenDate.getMonth()).toBe(currentMonth + 2);
    appDate.setNextMonth();
    expect(appDate.chosenDate.getMonth()).toBe(currentMonth + 3);
  });

  test('setPrevMonth works correct', () => {
    const currentMonth = new Date().getMonth();

    appDate.setPrevMonth();
    expect(appDate.chosenDate.getMonth()).toBe(currentMonth - 1);
    appDate.setPrevMonth();
    expect(appDate.chosenDate.getMonth()).toBe(currentMonth - 2);
    appDate.setPrevMonth();
    expect(appDate.chosenDate.getMonth()).toBe(currentMonth - 3);
  });
});
