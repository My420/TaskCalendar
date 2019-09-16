const findSubstring = (str, substr) => {
  const search = new RegExp(substr, 'i');

  return str.match(search);
};

export default findSubstring;
