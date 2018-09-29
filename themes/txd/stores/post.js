import { observable, action } from 'mobx';
import { getList, getDetail, getToc } from '../services/yuque';
import { getImgs } from '../services/bing';

export default class PostStore {
  @observable
  posts = []; // 文章列表

  @observable
  post = {}; // 文章详情

  @observable
  toc = []; // 文章目录

  @observable
  imgs = []; // 封面图

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

  @action
  fetchToc() {
    return getToc()
      .then((toc) => {
        this.toc = toc;
        return toc;
      });
  }

  @action
  fetchImgs() {
    return getImgs()
      .then((imgs) => {
        this.imgs = imgs;
        return imgs;
      });
  }

  toJS() {
    return {
      post: this.post,
      posts: this.posts,
      toc: this.toc,
      imgs: this.imgs,
    };
  }

  static fromJS({ posts, post, imgs }) {
    const postStore = new PostStore();
    postStore.posts = Array.isArray(posts) ? posts : [];
    postStore.imgs = Array.isArray(imgs) ? imgs : [];
    if (post) {
      postStore.post[post.slug] = post;
    }
    return postStore;
  }
}
