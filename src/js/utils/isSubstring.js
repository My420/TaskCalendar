import escapeSpecialCharacters from './escapeSpecialCharacters';

const isSubstring = (str, substr) => {
  const escapedSubstr = escapeSpecialCharacters(substr);
  const search = new RegExp(escapedSubstr, 'i');

  return search.test(str);
};

export default isSubstring;
