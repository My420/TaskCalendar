import AbstractView from './AbstractView';

class HeaderView extends AbstractView {
  constructor(choosenDate) {
    super();
    this._choosenDate = choosenDate;
  }

  get template() {
    return `<header>
        <span>Выбранная дата: ${this._choosenDate}</span>
        </header>`;
  }
}

export default HeaderView;
