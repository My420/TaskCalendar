const setDayOnMonday = date => {
  let day = date.getDay();
  while (day !== 1) {
    date.setDate(date.getDate() - 1);
    day = date.getDay();
  }
};

export default setDayOnMonday;
