import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import IndexRouter from './common/router';

export default class Main extends Component {
  static getPartial(props) {
    const { ctx, store } = props;
    const { posts, post, config, mobileMode = false } = store;
    return {
      html: <IndexRouter
        context={{}}
        location={ctx.req.url}
        postStore={{ posts, post }}
        appStore={{ config, ui: {}, mobileMode }}
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

  renderHead() {
    const { props } = this;
    const { helper, config = {}, post = {} } = props;
    const { cnzz = {} } = config;
    return (
      <head>
        <title>{config.title || 'Untitled'}</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content={config.keywords} />
        <meta name="description" content={post.description || config.description} />
        <meta name="HandheldFriendly" content="True" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href={helper.asset('index.css')} />
        {
          cnzz.siteId && <script dangerouslySetInnerHTML={{
            __html: `!function(a,b){if(!b.__SV){var c,d,e,f;window.dplus=b,b._i=[],b.init=function(a,c,d){function g(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]),a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var h=b;for("undefined"!=typeof d?h=b[d]=[]:d="dplus",h.people=h.people||[],h.toString=function(a){var b="dplus";return"dplus"!==d&&(b+="."+d),a||(b+=" (stub)"),b},h.people.toString=function(){return h.toString(1)+".people (stub)"},e="disable track track_links track_forms register unregister get_property identify clear set_config get_config get_distinct_id track_pageview register_once track_with_tag time_event people.set people.unset people.delete_user".split(" "),f=0;f<e.length;f++)g(h,e[f]);b._i.push([a,c,d])},b.__SV=1.1,c=a.createElement("script"),c.type="text/javascript",c.charset="utf-8",c.async=!0,c.src="//w.cnzz.com/dplus.php?id=${cnzz.siteId}",d=a.getElementsByTagName("script")[0],d.parentNode.insertBefore(c,d)}}(document,window.dplus||[]),dplus.init("${cnzz.siteId}");`,
          }}
          />
        }
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('addEventListener' in document) {
              document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
              }, false);
            }
            if(!window.Promise) {
              document.writeln('<script src="https://as.alipayobjects.com/g/component/es6-promise/3.2.2/es6-promise.min.js"'+'>'+'<'+'/'+'script>');
            }
          `,
        }}
        />
      </head>
    );
  }

  render() {
    const { props } = this;
    const { html, helper, state, env } = props;
    return (
      <html>
        {
          this.renderHead()
        }
        <body>
          <div id="container" dangerouslySetInnerHTML={{ __html: html }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.initialState = ${state};
            `,
            }}
          />
          <script src="//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js" />
          <script src="//cdn.bootcss.com/snap.svg/0.5.1/snap.svg-min.js" />
          <script src={helper.asset('manifest.js')} />
          <script src={helper.asset('index.js')} />
          {
            env === 'local' ? null : <script
              dangerouslySetInnerHTML={{
                __html: `
                if ('serviceWorker' in navigator) {
                  // Use the window load event to keep the page load performant
                  window.addEventListener('load', () => {
                    navigator
                      .serviceWorker
                      .register('/service-worker.js', {scope: '/'});
                  });
                }
                `,
              }}
            />
          }
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
