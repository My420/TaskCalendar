const deleteTimePart = date => {
  return date.split('T')[0];
};

export default deleteTimePart;
