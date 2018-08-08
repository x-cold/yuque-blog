import React, { Component } from 'react';

import { getDetail } from '../../services/yuque';

import Static from '../../widgets/static/static';
import Loader from '../../widgets/loader';
import Hero from '../../widgets/hero/hero';

import './index.scss';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  fetchPost() {
    const { match } = this.props;
    const slug = match.params.slug;
    getDetail(slug).then((res) => {
      this.setState({ post: res });
    });
  }

  render() {
    const { post } = this.state;
    if (!post) {
      return <Loader />;
    }
    const { body_html } = post;
    const style = {};
    if (window.isMobile) {
      const { ui } = this.props;
      const windowWidth = ui.windowWidth;
      style.width = `${windowWidth / 2 - 20}px`;
      style.height = style.width;
    }
    return (
      <div className="post">
        <Hero
          {...post}
        />
        <Static html={body_html} />
        {/* <div className="post-author">
          <div className="author-avatar"><img src={author.profile_image || 'https://gw.alicdn.com/tfs/TB1DhYHf5qAXuNjy1XdXXaYcVXa-105-121.png'} /></div>
          <div className="author-name">{author.name}</div>
          <div className="author-bio">{author.bio}</div>
        </div> */}
        {/* <div className="near-posts">
          <div className="near-tip">再看一篇</div>
          <div className="post-list">
            {
              posts.map(post => (
                <div className="near-post" style={{width: style.width}}>
                  <a className="background-container" style={{height: style.height}} target="_blank" href={post.url}>
                    <div className="background-inner" style={post.feature_image && { backgroundImage: `url(${post.feature_image})` } || {}}></div>
                  </a>
                  <h2 className="post-title">{post.title}</h2>
                </div>
              ))
            }
          </div>
        </div> */}
        {/* <Footer showLinks={true}></Footer> */}
      </div>
    );
  }
}
