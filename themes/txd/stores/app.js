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

  listenWindow() {
    domReady(this.setUI.bind(this));
    window.addEventListener('resize', this.setUI.bind(this));
  }

  static fromJS({ config }) {
    const appStore = new AppStore();
    appStore.config = config;
    return appStore;
  }
}
