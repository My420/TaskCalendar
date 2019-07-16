import HeaderView from './HeaderView';

class AppView {
  constructor(chosenDate) {
    this._rootElement = document.querySelector('.root');
    this._header = new HeaderView(chosenDate);
  }

  init() {
    this._rootElement.appendChild(this._header.render());
  }
}

export default AppView;
