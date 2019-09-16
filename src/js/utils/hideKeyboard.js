// hide mobile keyboard

const hideKeyboard = element => {
  element.setAttribute('readonly', 'true');
  element.setAttribute('disabled', 'true');
  setTimeout(() => {
    element.blur();
    element.removeAttribute('readonly');
    element.removeAttribute('disabled');
  }, 100);
};

export default hideKeyboard;
