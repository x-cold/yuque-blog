import React, { Component } from 'react';

import './index.scss';

export default class Footer extends Component {
  render() {
    const { mobileMode } = window;
    if (mobileMode) {
      return null;
    }
    return (
      <footer className="home-footer">
        <div className="copyright">
          <p>Copyright © 1999 - 2018 Alibaba Inc. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
}
