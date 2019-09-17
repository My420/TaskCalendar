const isSubstring = (str, substr) => {
  const search = new RegExp(substr, 'i');

  return search.test(str);
};

export default isSubstring;
