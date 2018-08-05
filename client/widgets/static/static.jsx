import React from 'react';
import marked from 'marked';

import './static.scss';

export default function Static(props) {
  const { html, markdown } = props;
  if (!markdown && !html) {
    return null;
  }
  return (
    <div
      className='static'
      dangerouslySetInnerHTML={{__html: html || marked(markdown)}}
    />
  );
}
