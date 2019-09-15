import createElement from '../utils/createElement';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template","bind", "unbind"] }] */

class AbstractView {
  constructor(parentElement = null) {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._element = null;
    this._parentElement = parentElement;
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define a template.`);
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    if (this._parentElement.nodeType === 1) {
      this._parentElement.appendChild(this.element);
    }
    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    if (this._parentElement.nodeType === 1) {
      this._parentElement.innerHTML = '';
    }
    this._element = null;
  }
}

export default AbstractView;
