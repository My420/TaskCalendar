const findAllArrayInObj = (elem, callback) => {
  if (typeof elem === 'object') {
    if (Array.isArray(elem)) {
      if (elem.length > 0) {
        callback(elem);
        return null;
      }
      return null;
    }
    const child = Object.keys(elem);
    for (let i = 0; i < child.length; i += 1) {
      findAllArrayInObj(elem[child[i]], callback);
    }
  }
  return null;
};

export default findAllArrayInObj;
