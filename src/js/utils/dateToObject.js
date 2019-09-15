const dateToObject = date => {
  const dateArray = date.split(`-`);
  return {
    year: dateArray[0],
    month: dateArray[1],
    date: dateArray[2]
  };
};

export default dateToObject;
