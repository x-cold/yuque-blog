import { observable } from 'mobx';

export default class PostStore {
  @observable
  posts = [];

  @observable
  post = {};

  toJS() {
    return this.posts;
  }

  static fromJS({ posts, post }) {
    const postStore = new PostStore();
    postStore.posts = Array.isArray(posts) ? posts : [];
    postStore.post = post || {};
    return postStore;
  }
}
