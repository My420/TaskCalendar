import AppController from './controller/AppController';

const rootElement = document.querySelector('.root');

const controller = new AppController(rootElement);

controller.init();
