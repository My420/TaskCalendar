const findTaskIndex = (arr, id) => {
  let index;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].taskId === id) {
      index = i;
    }
  }
  return index;
};

export default findTaskIndex;
