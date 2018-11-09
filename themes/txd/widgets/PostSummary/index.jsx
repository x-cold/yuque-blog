import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

function formatIndex(index) {
  return index > 8 ? index + 1 : `0${index + 1}`;
}

export default class Card extends Component {
  getReactStyle() {
    const { cardHeight, active } = this.props;
    if (window.isMobile) {
      return {
        height: `${cardHeight}px`,
        width: `${cardHeight}px`,
      };
    }
    if (active) {
      return {
        height: `${cardHeight * 1.7}px`,
        width: `${cardHeight * 1.7}px`,
      };
    }
    return {
      height: `${cardHeight}px`,
      width: `${cardHeight}px`,
    };
  }

  getMainStyle(rectStyle) {
    const { cardHeight } = this.props;
    const mainHeight = cardHeight * (window.isMobile ? 1.3 : 1.7);
    const mainStyle = { width: rectStyle.width, height: `${mainHeight}px` };
    return mainStyle;
  }

  getSummary() {
    const { post } = this.props;
    const { slug, tags = [], title, updated_at, description } = post;
    let { thumb } = post;
    thumb = thumb ||
      '//gw.alicdn.com/tfs/TB1ZRXdpb_I8KJjy1XaXXbsxpXa-618-614.png';
    const tagName = tags[0] && tags[0].name || '-';
    const date = new Date(updated_at)
      .toDateString()
      .replace(/ \w+/, '');
    const url = `/post/${slug}`;
    return {
      url,
      slug,
      tagName,
      date,
      thumb,
      title,
      desc: description,
    };
  }

  getSummaryClassName() {
    const { active } = this.props;
    let { className } = this.props;

    if (!Array.isArray(className)) {
      className = [className];
    }
    if (active && !window.isMobile) {
      className.push('active');
    }

    if (!active && !window.isMobile) {
      className.push('normal');
    }

    return ['post-summary', ...className].join(' ');
  }

  render() {
    const { post, index } = this.props;
    if (!post) {
      return null;
    }

    const {
      url,
      title,
      thumb,
      date,
      tagName,
      desc,
    } = this.getSummary();
    const rectStyle = this.getReactStyle();
    const mainStyle = this.getMainStyle(rectStyle);

    return (
      <div
        className={this.getSummaryClassName()}
      >
        <div
          className="post-main"
          style={mainStyle}
        >
          <div className="post-meta">
            <div className="post-index">
              { formatIndex(index) }
            </div>
            <div className="post-date">
              { date }
            </div>
            <div className="post-tag">
              { tagName }
            </div>
          </div>
          <Link to={url} className="background-container" style={rectStyle}>
            <div
              className="background-inner"
              style={{ backgroundImage: `url(${thumb})` }}
            />
          </Link>
        </div>
        <div className="intro" style={{ width: rectStyle.width }}>
          <h2 className="post-title">{title}</h2>
          <div className="post-desc">
            { desc }
          </div>
        </div>
      </div>
    );
  }
}
