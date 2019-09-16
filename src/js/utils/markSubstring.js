const markSubstring = (str, substr, sign = '*') => {
  const search = new RegExp(substr, 'i');
  const replace = `${sign}${substr}${sign}`;

  return str.replace(search, replace);
};

export default markSubstring;
