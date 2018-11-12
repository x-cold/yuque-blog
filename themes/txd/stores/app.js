import { observable } from 'mobx';
import domReady from 'domready';

const mobileUserAgentRegx =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/;
export default class AppStore {
  @observable
  ui = {};

  @observable
  config = {};

  @observable
  mobileMode = false;

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
    const mobileMode = mobileUserAgentRegx
      .test(navigator.userAgent);
    this.mobileMode = mobileMode;
    window.mobileMode = this.mobileMode;
  }

  // Only run in client
  listenWindow() {
    this.initDefaultUI();
    this.initFastClick();
    this.setMoblie();
  }

  static fromJS({ config, mobileMode }) {
    const appStore = new AppStore();
    appStore.config = config;
    appStore.mobileMode = mobileMode;
    return appStore;
  }
}
