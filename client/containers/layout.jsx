import React, { PureComponent } from 'react';

import HScroll from '../widgets/hscroll/index.jsx';
import Header from './header/header.jsx';

export default class Layout extends PureComponent {
  render() {
    const { children, location } = this.props;
    const pathname = location || '';
    // 博客详情页
    if (pathname.indexOf('/post/')) {
      return <div className="wrapper full-layout-wrapper">{children}</div>;
    }
    // 主页
    if (pathname === '/') {
      return (
        <HScroll className="wrapper horizontal-wrapper home-wrapper"> {children}</HScroll>
      );
    }
    // 博客列表、关于我们、招聘
    return (
      <div className="wrapper horizontal-wrapper">
        <Header
          ui={this.props.ui}
          url={this.props.url}
        />
        {children}
      </div>
    );
  }
}
