const compareUpToMonth = (firstDate, secondDate) => {
  const first = firstDate.slice(0, 7);
  const second = secondDate.slice(0, 7);
  return first === second;
};

export default compareUpToMonth;
