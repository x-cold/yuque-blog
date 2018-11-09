import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export default class Card extends Component {
  render() {
    const { post, style } = this.props;
    if (!post) {
      return null;
    }
    const { slug, tags = [], title, updated_at } = post;
    let { thumb } = post;
    thumb = thumb ||
      '//gw.alicdn.com/tfs/TB1ZRXdpb_I8KJjy1XaXXbsxpXa-618-614.png';
    const url = `/post/${slug}`;
    const tagName = tags[0] && tags[0].name || '-';
    const date = new Date(updated_at).toDateString();
    const cls = {
      backgroundImage: `url('${thumb}')`,
    };
    return (
      <div>
        <Link
          className="post-box"
          style={{
            ...style,
          }}
          to={url}
        >
          <div className="background-container">
            <div className="background-inner" style={cls} />
          </div>
          <div className="overlay">
            <div className="intro">
              <div className="intro-container" />
              <div className="text-container">
                <h2 className="post-title">{title}</h2>
                <div className="post-desc">
                  <div className="post-tag">{tagName}</div>
                  <div className="post-date">{date}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
