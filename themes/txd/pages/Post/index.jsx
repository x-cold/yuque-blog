import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import Footer from '../../containers/Footer';

import Loader from '../../widgets/Loader';
import PostContent from '../../widgets/PostContent';
import PostMeta from '../../widgets/PostMeta';

import './index.scss';

@inject('appStore')
@inject('postStore')
@observer
export default class Post extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { match, postStore } = this.props;
    const { slug } = match.params;
    postStore.fetchPost(slug).then((post) => {
      postStore.fetchUser(post.user_id);
    });
    postStore.fetchPosts();
  }

  renderNearPost() {
    const { postStore, appStore, match } = this.props;
    const { posts } = postStore;
    const { ui } = appStore;
    const { slug } = match.params;

    const style = {};
    if (window.isMobile) {
      const { windowWidth } = ui;
      style.width = `${windowWidth / 2 - 20}px`;
      style.height = style.width;
    }

    let nearPosts;
    // 寻找最近的四篇文章
    const total = posts.length;
    if (total < 5) {
      nearPosts = posts.filter(post => post.slug === slug);
    } else {
      let currentIndex = posts.findIndex(post => post.slug === slug);
      const filledPosts = posts.concat(posts).concat(posts);
      currentIndex += total;
      nearPosts = filledPosts.slice(currentIndex - 3, currentIndex - 1)
        .concat(filledPosts.slice(currentIndex + 1, currentIndex + 3));
    }

    return (
      <div className="near-posts">
        <div className="near-tip">再看一篇</div>
        <div className="post-list">
          {
            nearPosts.map(post => (
              <div
                className="near-post"
                style={{ width: style.width }}
                key={`near-post-${post.slug}`}
              >
                <Link
                  className="background-container"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ height: style.height }}
                  to={`/post/${post.slug}`}
                >
                  <div
                    className="background-inner"
                    style={{
                      backgroundImage: `url(${post.thumb || '//gw.alicdn.com/tfs/TB1ZRXdpb_I8KJjy1XaXXbsxpXa-618-614.png'})`,
                    }}
                  />
                </Link>
                <h2 className="post-title">{post.title}</h2>
              </div>
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    const { postStore, match } = this.props;
    const { slug } = match.params;
    const post = postStore.post[slug];
    const { user } = postStore;
    if (!post) {
      return <Loader />;
    }
    const { body_html, title, updated_at } = post;
    return (
      <section className="post-page">
        <PostMeta
          title={title}
          updated_at={updated_at}
        />
        <PostContent html={body_html} />
        <div className="post-author">
          <div className="author-avatar">
            <img src={user.avatar_url || '//gw.alicdn.com/tfs/TB1DhYHf5qAXuNjy1XdXXaYcVXa-105-121.png'} />
          </div>
          <div className="author-name">{user.name}</div>
          {/* <div className="author-bio">{author.bio}</div> */}
        </div>
        {
          this.renderNearPost()
        }
        <Footer showLinks />
      </section>
    );
  }
}
