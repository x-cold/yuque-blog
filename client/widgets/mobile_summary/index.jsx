import React, { Component } from 'react';

import './index.scss';

export default class Card extends Component {
  render() {
    const { post, cardHeight } = this.props;
    if (!post) {
      return null;
    }
    const { url, tags = [], feature_image, title, updated_at } = post;
    const tagName = tags[0] && tags[0].name || '-';
    const date = new Date(updated_at).toDateString();
    const style = { width: cardHeight + 'px', height: cardHeight + 'px'};
    return (
      <div class="mobile-post-box">
        <a
          href={url}
          style={style}
        >
          <div className="background-container">
            <div className="background-inner" style={feature_image && { backgroundImage: `url(${feature_image})` } || {}}></div>
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
        </a>
      </div>
    );
  }
}
