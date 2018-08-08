import { observable } from 'mobx';

export default class PostStore {
  @observable
  posts = [];

  toJS() {
    return this.posts;
  }

  static fromJS(array) {
    const postStore = new PostStore();
    postStore.posts = array;
    return postStore;
  }
}
