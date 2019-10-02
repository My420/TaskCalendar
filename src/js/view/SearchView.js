import AbstractView from './AbstractView';
import searchResultTemplate from './searchResultTemplate';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["changeTask", "deleteTask", "onTaskDelete"] }] */
class SearchView extends AbstractView {
  constructor(data, parentElement) {
    super(parentElement);
    this._data = data;
    this._emptyMessage = 'Ничего не найдено';
    this._onClick = this._onClick.bind(this);
  }

  _onClick(evt) {
    const { action } = evt.target.dataset;
    if (action === 'close') {
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
  }

  unbind() {
    this._search.removeEventListener('click', this._onClick);
    this._search = null;
  }
}

export default SearchView;
