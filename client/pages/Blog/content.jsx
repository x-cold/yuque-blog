import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import HScroll from '../../widgets/hscroll/index.jsx';
import Loader from '../../widgets/loader';
import PostSummary from '../../widgets/post_summary/index.jsx';
// import { tags } from '../../info.json';

import './index.scss';

@inject('appStore')
@inject('postStore')
@observer

export default class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  renderPosts(cardHeight) {
    const { postStore } = this.props;
    const { posts } = postStore;
    const { activeIndex } = this.state;
    return posts.map((post, index) => (<PostSummary
      className="fadeInRight"
      active={index === activeIndex}
      key={post.slug}
      post={post}
      cardHeight={cardHeight}
      index={index}
    />));
  }

  // renderTags() {
  //   const { url } = this.props;
  //   return tags.map(tag => <li key={tag.url} className={`${url.indexOf(tag.url) > -1 ? 'active' : ''} fadeInRight`}>
  //     <a href={tag.url}>{tag.name}</a>
  //   </li>);
  // }

  render() {
    const { postStore, appStore } = this.props;
    const { posts } = postStore;
    const { ui = {} } = appStore;
    if (!posts) {
      return (<div className="common-page">
        <div className="page-title">Blog</div>
        <Loader />
      </div>);
    }
    // 动态计算卡片高 (宽等值)
    const containerHeight = window.isMobile ? ui.windowHeight - 50 : ui.windowHeight - 30 - 30 - 70;
    const cardHeight = window.isMobile ? (ui.windowWidth - 72 - 12) : (containerHeight - 70) / 2.5;
    return (
      <div className="common-page">
        <div className="page-title">Blog</div>
        <HScroll
          className="page-container blog-post-list"
          ref={(e) => { this.container = e; }}
          style={{
            height: `${containerHeight}px`,
          }}
        >
          {
            this.renderPosts(cardHeight)
          }
        </HScroll>
      </div>
    );
  }
}
