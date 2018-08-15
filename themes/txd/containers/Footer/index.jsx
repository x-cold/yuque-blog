import React from 'react';
import { observer, inject } from 'mobx-react';

import './index.scss';

@inject('appStore')
@observer
export default class Footer extends React.Component {
  renderLinks() {
    if (!this.props.showLinks) {
      return null;
    }
    const { appStore } = this.props;
    const { config } = appStore;
    const { links = [] } = config;
    return links.map(link => (
      <a
        key={link.name}
        href={link.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        { link.name }
      </a>
    ));
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
