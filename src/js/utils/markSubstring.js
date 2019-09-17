const markSubstring = (str, substr, openMark = '*', closeMark = '*') => {
  const search = new RegExp(substr, 'i');
  const match = str.match(search)[0];
  const replace = `${openMark}${match}${closeMark}`;

  return str.replace(search, replace);
};

export default markSubstring;
