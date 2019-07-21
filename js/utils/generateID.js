const generateID = () => {
  const id = Math.random()
    .toString(36)
    .substr(2, 5);
  return id;
};

export default generateID;
