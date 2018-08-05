import React, { Component } from 'react';

import './index.scss';

export default class Card extends Component {
  render() {
    const { post, style } = this.props;
    if (!post) {
      return null;
    }
    const { url, tags = [], title, updated_at } = post;
    const tagName = tags[0] && tags[0].name || '-';
    const date = new Date(updated_at).toDateString();
    return (
      <div>
        <a
          className="post-box"
          style={{
            ...style,
          }}
          href={url}
        >
          <div className="background-container">
            <div className="background-inner" />
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
        </a>
      </div>
    );
  }
}
