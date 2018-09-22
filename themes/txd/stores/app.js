import { observable } from 'mobx';
import domReady from 'domready';

export default class AppStore {
  @observable
  ui = {};

  @observable
  config = {};

  @observable
  isMobile = false;

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

  initDefaultUI() {
    domReady(this.setUI.bind(this));
    window.addEventListener('resize', this.setUI.bind(this));
  }

  setMoblie() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      .test(navigator.userAgent);
    this.isMobile = isMobile;
    window.isMobile = this.isMobile;
  }

  // Only run in client
  listenWindow() {
    this.initDefaultUI();
    this.initFastClick();
    this.setMoblie();
  }

  static fromJS({ config, isMobile }) {
    const appStore = new AppStore();
    appStore.config = config;
    appStore.isMobile = isMobile;
    return appStore;
  }
}
