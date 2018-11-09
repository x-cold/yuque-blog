import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import HScroll from '../../widgets/Hscroll';
import Loader from '../../widgets/Loader';
import PostSummary from '../../widgets/PostSummary';

import './index.scss';

@inject('appStore')
@inject('postStore')
@observer
export default class HomeContent extends Component {
  constructor(props) {
    super(props);
    const { postStore } = this.props;
    const { posts } = postStore;
    this.state = {
      activeIndex: 0,
      slug: 'All',
      curPosts: posts,
      tocMap: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { postStore } = this.props;
    postStore
      .fetchToc()
      .then(toc => this.formatToc(toc));
  }

  renderPosts(cardHeight, posts) {
    const { activeIndex } = this.state;
    return posts.map((post, index) => (
      <PostSummary
        className="fadeInRight"
        index={index}
        active={index === activeIndex}
        key={post.slug}
        post={post}
        cardHeight={cardHeight}
      />
    ));
  }

  // 格式化toc为map对象
  formatToc(toc) {
    let tip = '';
    const tocMap = {};
    (toc || []).forEach((t) => {
      if (t.depth === 1) {
        tip = t.title;
        tocMap[t.title] = [];
      } else {
        tocMap[tip].push(t.slug);
      }
    });
    this.setState({ tocMap });
  }

  // 更新视图
  updatePost(slug) {
    const { tocMap } = this.state;
    const { postStore } = this.props;
    const { posts } = postStore;
    let newPost = [];
    if (slug === 'All') {
      newPost = posts;
    } else {
      (posts || []).map(post => tocMap[slug].indexOf(post.slug) > -1 && newPost.push(post));
    }
    this.setState({ curPosts: newPost });
  }

  // 更新当前分类
  updateSlug(slug) {
    if (!slug) {
      return;
    }
    this.setState({ slug });
    this.updatePost(slug);
  }

  renderTags() {
    const { postStore } = this.props;
    const { toc } = postStore;
    const { slug } = this.state;
    let tags = (toc || []).filter(i => i.depth === 1);
    tags.unshift({ slug: 'all', title: 'All' });
    tags = window.isMobile ? tags : tags.slice(0, 5);

    return tags.map(tag => (
      <li
        className={`fadeInRight${slug.indexOf(tag.title) > -1 ? ' active' : ''}`}
        key={`blog-tag-${tag.title}`}
      >
        <span onClick={this.updateSlug.bind(this, tag.title)}>{tag.title}</span>
      </li>
    ));
  }

  render() {
    const { appStore } = this.props;
    const { curPosts } = this.state;
    const { ui = {} } = appStore;

    if (!curPosts) {
      return (
        <div className="common-page">
          <div className="page-title">Blog</div>
          <Loader />
        </div>
      );
    }
    const { isMobile } = window;
    // 动态计算卡片高 (宽等值)
    const containerHeight = isMobile ?
      ui.windowHeight - 50 :
      ui.windowHeight - 30 - 30 - 70;
    const cardHeight = isMobile ?
      (ui.windowWidth - 72 - 12) :
      (containerHeight - 70) / 2.5;
    return (
      <div className="common-page blog-page">
        <div className="page-title">Blog</div>
        <div className="search-bar">
          <ul className="filter-list">
            {
              this.renderTags()
            }
          </ul>
          <div className="search" />
        </div>
        <HScroll
          className="horizontal-container blog-post-list"
          ref={(e) => { this.container = e; }}
          style={{
            height: `${containerHeight}px`,
          }}
        >
          {
            this.renderPosts(cardHeight, curPosts)
          }
        </HScroll>
      </div>
    );
  }
}
