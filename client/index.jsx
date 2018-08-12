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
    const { posts = [], post = {} } = props;
    const store = {
      posts,
      post,
    };
    return store;
  }

  render() {
    const { html, helper, state } = this.props;
    return (
      <html>
        <head>
          <title>阿里巴巴 TXD 博客</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
        </head>
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.initialState = ${state}`,
            }}
          />
          <script src="//cdn.bootcss.com/snap.svg/0.5.1/snap.svg-min.js" />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              // Check that service workers are registered
              if ('serviceWorker' in navigator) {
                // Use the window load event to keep the page load performant
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js', {scope: '/'});
                });
              }`,
            }}
          />
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
