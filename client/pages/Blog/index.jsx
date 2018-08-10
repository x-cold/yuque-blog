import React from 'react';
import HomeContent from './content.jsx';

import Layout from '../../containers/layout';
import './index.scss';

export default function Blog(props) {
  return (
    <Layout>
      <HomeContent {...props} />
    </Layout>
  );
}
