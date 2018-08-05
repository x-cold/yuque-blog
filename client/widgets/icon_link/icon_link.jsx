import React from 'react';

import './icon_link.scss';
import * as icons from '../icons/icons.jsx';

export default function IconLink(props) {
  return (
    <a
      className='icon-link'
      href={props.url}
      style={{width: '20px', 'height': '20px'}}
    >
      {React.createElement(icons[props.name])}
    </a>
  );
}
