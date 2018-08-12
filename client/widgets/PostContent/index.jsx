import React from 'react';

import './index.scss';

export default function Static(props) {
  const { html } = props;
  if (!html) {
    return null;
  }
  return (
    <div
      className="static typo typo-bi"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
