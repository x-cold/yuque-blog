import { observable } from 'mobx';
import domReady from 'domready';

export default class AppStore {
  @observable
  ui = {};

  @observable
  config = {};

  setUI() {
    this.ui.windowWidth = window.innerWidth;
    this.ui.windowHeight = window.innerHeight;
  }

  initFastClick() {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', () => {
        window.FastClick && window.FastClick.attach(document.body);
      }, false);
    }
  }

  initMobileFlag() {
    window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
  }

  initDefaultUI() {
    domReady(this.setUI.bind(this));
    window.addEventListener('resize', this.setUI.bind(this));
  }

  // Only run in client
  listenWindow() {
    this.initDefaultUI();
    this.initFastClick();
    this.initMobileFlag();
  }

  static fromJS({ config }) {
    const appStore = new AppStore();
    appStore.config = config;
    return appStore;
  }
}
