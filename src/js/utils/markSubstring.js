import escapeSpecialCharacters from './escapeSpecialCharacters';

const markSubstring = (str, substr, openMark = '*', closeMark = '*') => {
  const escapedSubstr = escapeSpecialCharacters(substr);
  const search = new RegExp(escapedSubstr, 'i');

  return str.replace(search, match => {
    return `${openMark}${match}${closeMark}`;
  });
};

export default markSubstring;
