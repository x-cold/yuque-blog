import React from 'react';

import { links } from '../../info.json';

import './index.scss';

export default class Footer extends React.Component {
  renderLinks() {
    if (!this.props.showLinks) {
      return null;
    }
    return links.map((link, i) => <a key={i} href={link.url}>{ link.name }</a>);
  }

  render() {
    return (
      <footer className="footer">
        <div className="copyright">
          <p>Copyright © 1999 - 2018 Alibaba Inc. All Rights Reserved.</p>
        </div>
        <div className="link-list">
          {
            this.renderLinks()
          }
        </div>
      </footer>
    );
  }
}
