import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export default class Card extends Component {
  render() {
    const { post, cardHeight } = this.props;
    if (!post) {
      return null;
    }
    const { url, tags = [], title, updated_at } = post;
    let { thumb } = post;
    thumb = thumb ||
      '//gw.alicdn.com/tfs/TB1ZRXdpb_I8KJjy1XaXXbsxpXa-618-614.png';
    const tagName = tags[0] && tags[0].name || '-';
    const date = new Date(updated_at).toDateString();
    const style = { width: `${cardHeight}px`, height: `${cardHeight}px` };
    return (
      <div className="mobile-post-box">
        <Link
          to={url}
          style={style}
        >
          <div className="background-container">
            <div
              className="background-inner"
              style={{
                backgroundImage: `url(${thumb})`,
              }}
            />
          </div>
          <div className="overlay">
            <div className="intro">
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
