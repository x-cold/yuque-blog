
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

import Loader from '../../widgets/Loader';
import PostCard from '../../widgets/PostCard';
import './index.scss';

@inject('appStore')
@inject('postStore')
@observer
export default class HomeContent extends Component {
  renderRow(posts, cardHeight) {
    const mapper = post => (
      <PostCard
        key={post.slug}
        post={post}
        style={{
          height: `${cardHeight}px`,
          width: `${cardHeight}px`,
        }}
        img={post.thumb}
      />
    );
    return (
      <div className="post-row">
        {
          posts.map(mapper)
        }
      </div>
    );
  }

  renderPosts() {
    const { appStore, postStore } = this.props;
    const { posts } = postStore;
    const { ui } = appStore;
    const { windowWidth } = ui;
    const containerHeight = ui.windowHeight - 60 - 72;
    // 动态计算卡片高 (宽等值)
    const cardHeight = window.isMobile ?
      (windowWidth - 60) : ((containerHeight - 32) / 2);

    let showPosts;
    // 动态控制文章数量
    if (windowWidth < 1440 && !window.isMobile) {
      showPosts = posts.slice(0, 4);
    } else {
      showPosts = posts.slice(0, 6);
    }
    // 两行布局
    const col1Posts = showPosts.filter((p, index) => index % 2 === 0);
    const col2Posts = showPosts.filter((p, index) => index % 2 !== 0);
    return (<div
      className="post-list"
    >
      {
        this.renderRow(col1Posts, cardHeight)
      }
      {
        this.renderRow(col2Posts, cardHeight)
      }
    </div>);
  }

  renderReadMore() {
    const { appStore, postStore } = this.props;
    const { posts } = postStore;
    const { config } = appStore;
    const { links } = config;
    const total = posts.length || 0;
    const { isMobile } = window;
    const mapper = link => (
      <a
        className="link-item"
        href={link.url}
        key={`friends-link-${link.url}`}
      >
        {link.name}
      </a>
    );

    return (
      <div className="read-more">
        <div className="social-share">
          <div className="social-item" >
            <img
              src="//img.alicdn.com/tfs/TB1fpDuduuSBuNjSsplXXbe8pXa-48-38.png"
            />
          </div>
          <div className="social-item">
            <img
              src="//img.alicdn.com/tfs/TB16h_2dx9YBuNjy0FfXXXIsVXa-46-38.png"
            />
          </div>
          {
            isMobile && <div className="friend-links">{links.map(mapper)}</div>
          }
          {
            isMobile && <div className="copyright">
              <p>Copyright © 1999 - 2018 Alibaba Inc. All Rights Reserved.</p>
            </div>
          }
        </div>
        <div className="more-guide">
          <div className="total">
            {total > 9 ? total : `0${total}`}
          </div>
          <Link className="more-link" to="/blogs">
            <span>{isMobile ? 'READ MORE' : 'MORE'}</span>
            <img
              src="//img.alicdn.com/tfs/TB1D1bUdv5TBuNjSspmXXaDRVXa-28-16.png"
            />
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { postStore } = this.props;
    const { posts } = postStore;
    if (!posts) {
      return <Loader />;
    }
    return (
      <div className="home-page">
        {
          this.renderPosts()
        }
        {
          this.renderReadMore()
        }
      </div>
    );
  }
}
