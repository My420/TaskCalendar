import AbstractView from './AbstractView';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["template"] }] */

class LoadingView extends AbstractView {
  get template() {
    return `<section class="loading">
    <h2 class="visually-hidden">Идет загрузка данных</h2>
    <div class="loading__wrapper ">
        <div class="loading__inner">
            <svg class="loading__svg" width="108px"  height="108px"   viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-flickr" style="background: none;"><circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="64.6654" fill="orange" r="20"><animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate></circle><circle ng-attr-cx="{{config.cx2}}" cy="50" ng-attr-fill="{{config.c2}}" ng-attr-r="{{config.radius}}" cx="35.3346" fill="yellowgreen" r="20"><animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate></circle><circle ng-attr-cx="{{config.cx1}}" cy="50" ng-attr-fill="{{config.c1}}" ng-attr-r="{{config.radius}}" cx="64.6654" fill="yellow" r="20"><animate attributeName="cx" calcMode="linear" values="30;70;30" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate><animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" ng-attr-dur="{{config.speed}}s" repeatCount="indefinite" dur="1s"></animate></circle></svg>
        </div>
    </div>
    </section>`;
  }
}

export default LoadingView;
