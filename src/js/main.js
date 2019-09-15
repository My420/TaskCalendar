import AppPresenter from './presenter/AppPresenter';

const rootElement = document.querySelector('.root');

const controller = new AppPresenter(rootElement);

controller.init();
