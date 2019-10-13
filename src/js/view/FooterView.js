import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template"] }] */

class FooterView extends AbstractView {
  constructor(parentElement) {
    super(parentElement);
    this._parentElement = parentElement;
  }

  get template() {
    return `<footer class="app__footer footer">
        <ul class="footer__contacts contacts">
          <li class="contacts__item">
            <a class="contacts__link contacts__link--github" href="https://github.com/My420">
                <span class="visually-hidden">Github</span>
                <svg  class="contacts__icon contacts__icon--github" width="100%" height="100%" viewBox="0 0 24 24"><path class="contacts__path contacts__path--github" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </li>
          <li class="contacts__item">
            <a class="contacts__link contacts__link--mail" href="mailto:klinovitsky.aleksey@gmail.com">
                <span class="visually-hidden">Почта</span>
                <svg  class="contacts__icon contacts__icon--email" width="100%" height="100%" viewBox="0 0 24 24"><path class="contacts__path contacts__path--email" d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
            </a>
          </li>
          <li class="contacts__item">
            <a class="contacts__link contacts__link--skype" href="skype:live:klinovitsky.aleksey?chat">
              <span class="visually-hidden">Skype</span>
              <svg  class="contacts__icon contacts__icon--skype" width="100%" height="100%" viewBox="0 0 24 24"><path class="contacts__path contacts__path--skype" d="M22.987 13.966c1.357-7.765-5.416-14.412-13.052-12.979-5.821-3.561-12.503 3.226-8.935 9.029-1.387 7.747 5.384 14.48 13.083 13.01 5.832 3.536 12.493-3.26 8.904-9.06zm-10.603 5.891c-3.181 0-6.378-1.448-6.362-3.941.005-.752.564-1.442 1.309-1.442 1.873 0 1.855 2.795 4.837 2.795 2.093 0 2.807-1.146 2.807-1.944 0-2.886-9.043-1.117-9.043-6.543 0-2.938 2.402-4.962 6.179-4.741 3.602.213 5.713 1.803 5.917 3.289.101.971-.542 1.727-1.659 1.727-1.628 0-1.795-2.181-4.6-2.181-1.266 0-2.334.528-2.334 1.674 0 2.395 8.99 1.005 8.99 6.276-.001 3.039-2.423 5.031-6.041 5.031z"/></svg>
            </a>
          </li>
        </ul>
      </footer>`;
  }
}

export default FooterView;
