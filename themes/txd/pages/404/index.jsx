import React, { PureComponent } from 'react';

import './index.scss';

export default class NotFound extends PureComponent {
  render() {
    return (
      <div className="common-page notfound-page">
        <div className="page-title">
          404
        </div>
        <div className="horizontal-container page-container">
          <p>页面未找到！<a href="/">点此返回首页</a></p>
        </div>
      </div>
    );
  }
}
