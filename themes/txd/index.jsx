'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IndexRouter from './common/router';
import './pages/Home/index.scss';

export default class Index extends Component {
  static getPartial(props) {
    const { ctx, store } = props;
    const { posts, post, config } = store;
    return {
      html: <IndexRouter
        context={{}}
        location={ctx.req.url}
        postStore={{ posts, post }}
        appStore={{ config, ui: {} }}
      />,
    };
  }

  /**
   * construct store for server side
   */
  static getStore(props) {
    const { posts = [], post = {}, config = {} } = props;
    const store = {
      posts,
      post,
      config,
    };
    return store;
  }

  render() {
    const { props } = this;
    const { html, helper, state, config } = props;
    return (
      <html>
        <head>
          <title>{config.title || 'TXD 技术博客'}</title>
          <link rel="stylesheet" href={helper.asset('index.css')} />
          <meta name="keywords" content={config.keywords} />
          <meta name="description" content={config.description} />
          <meta charSet="UTF-8" />
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
                  navigator
                    .serviceWorker
                    .register('/service-worker.js', {scope: '/'});
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
