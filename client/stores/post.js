import { observable, action } from 'mobx';
import { getList, getDetail } from '../services/yuque';

export default class PostStore {
  @observable
  posts = []; // 文章列表

  @observable
  post = {}; // 文章详情

  @action
  fetchPosts() {
    return getList()
      .then((posts) => {
        posts = posts.filter(post => post.title !== 'New document');
        this.posts = posts;
        return posts;
      });
  }

  @action
  fetchPost(slug) {
    return getDetail(slug)
      .then((post) => {
        this.post[post.slug] = post;
        return post;
      });
  }

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
      postStore.post[post.slug] = post;
    }
    return postStore;
  }
}
