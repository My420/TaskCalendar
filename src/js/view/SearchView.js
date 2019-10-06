import AbstractView from './AbstractView';
import searchResultTemplate from './searchResultTemplate';
import { ESC_CODE, ENTER_CODE } from '../utils/constant';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["onResultClick"] }] */
class SearchView extends AbstractView {
  constructor(data, parentElement) {
    super(parentElement);
    this._data = data;
    this._emptyMessage = 'Ничего не найдено';
    this._onClick = this._onClick.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
  }

  _setFocus() {
    setTimeout(() => {
      this._search.querySelector('.search__button').focus();
    }, 50);
  }

  _onKeyUp(evt) {
    const { code } = evt;
    if (code === ESC_CODE) {
      this.unrender();
    } else if (code === ENTER_CODE) {
      this._onClick(evt);
    }
  }

  _onClick(evt) {
    const { action, date } = evt.target.dataset;
    if (action === 'close') {
      this.unrender();
    } else if (action === 'set') {
      this.onResultClick(date);
      this.unrender();
    }
  }

  _getResultsTemplate() {
    const { _data: data, _emptyMessage: emptyMsg } = this;

    if (data.length === 0) {
      return `<p class='search__empty'>${emptyMsg}</p>`;
    }

    const template = data
      .map(result => {
        return searchResultTemplate(result);
      })
      .join('');

    return `<ul class='search__list'>${template}</ul> `;
  }

  get template() {
    return `<section class='search' data-action='close'>
    <h2 class='visually-hidden'>Результаты поиска</h2>
    <div class='search__inner'>
    ${this._getResultsTemplate()}
        <div class='search__controls'>
            <button class='search__button' data-action='close'>Закрыть</button>
        </div>
    </div>
    </section>`;
  }

  bind() {
    this._search = this.element.querySelector('.search');
    this._search.addEventListener('click', this._onClick);
    this._search.addEventListener('keyup', this._onKeyUp);

    this._setFocus();
  }

  unbind() {
    this._search.removeEventListener('click', this._onClick);
    this._search.removeEventListener('keyup', this._onKeyUp);
  }

  onResultClick() {}
}

export default SearchView;
