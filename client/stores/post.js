import { observable } from 'mobx';

export default class PostStore {
  @observable
  posts = []; // 文章列表

  @observable
  post = {}; // 文章详情

  toJS() {
    return {
      post: this.post,
      posts: this.posts,
    };
  }

  static fromJS({ posts, post }) {
    const postStore = new PostStore();
    postStore.posts = Array.isArray(posts) ? posts : [];
    if (post) {
      postStore[post.slug] = post;
    }
    return postStore;
  }
}
