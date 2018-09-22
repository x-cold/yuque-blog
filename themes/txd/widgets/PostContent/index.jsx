import React from 'react';

import './index.scss';
import '../../styles/markdown.scss';

export default function Static(props) {
  const { html } = props;
  if (!html) {
    return null;
  }
  return (
    <div
      className="static markdown-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
