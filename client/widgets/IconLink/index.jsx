import React from 'react';

import './index.scss';
import * as icons from '../Icons';

export default function IconLink(props) {
  return (
    <a
      className="icon-link"
      href={props.url}
      style={{ width: '20px', height: '20px' }}
    >
      {React.createElement(icons[props.name])}
    </a>
  );
}
