const markSubstring = (str, substr, openMark = '*', closeMark = '*') => {
  const search = new RegExp(substr, 'i');
  const replace = `${openMark}${substr}${closeMark}`;

  return str.replace(search, replace);
};

export default markSubstring;
