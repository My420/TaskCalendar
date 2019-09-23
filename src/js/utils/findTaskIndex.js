const findTaskIndex = (arr, id) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].taskId === id) {
      return i;
    }
  }
  return undefined;
};

export default findTaskIndex;
