'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IndexRouter from './common/router';
import './pages/Home/index.scss';

export default class Index extends Component {
  static getPartial(props) {
    const { ctx, store } = props;
    return {
      html: <IndexRouter
        context={{}}
        location={ctx.req.url}
        store={store}
      />,
    };
  }

  /**
   * construct store for server side
   */
  static getStore(props) {
    const { posts = {} } = props;
    const store = {
      posts: posts.data,
    };
    return store;
  }

  render() {
    const { html, helper, state } = this.props;
    return (
      <html>
        <head>
          <title>Yuque Blog</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.initialState = ${state}`,
            }}
          />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
        </body>
      </html>
    );
  }
}

/**
 * client scope, wrapped in __CLIENT__ detect block
 * only run in client side
 */
if (__CLIENT__) {
  ReactDOM.render(
    <IndexRouter />,
    document.getElementById('container')
  );

  if (module.hot) {
    module.hot.accept('./common/router', () => {
      const NewIndexRouter = require('./common/router').default;
      ReactDOM.render(
        <NewIndexRouter />,
        document.getElementById('container')
      );
    });
  }
}
