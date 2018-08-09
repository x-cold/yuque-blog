import React from 'react';
import HomeContent from './content.jsx';

import './index.scss';

export default function Blog(props) {
  return (
    <div className="wrapper full-layout-wrapper">
      <HomeContent {...props} />
    </div>
  );
}
