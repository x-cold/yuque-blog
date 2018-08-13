'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

import AppStore from '../stores/app';
import PostStore from '../stores/post';

import { DefaultLayout, HomeLayout, BlogLayout } from '../containers/Layout';
import Home from '../pages/Home';
import Post from '../pages/Post';
import Blog from '../pages/Blog';
import About from '../pages/About';
import NotFound from '../pages/404';

import '../styles/site.scss';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

let postStore;
let appStore;

if (__CLIENT__) {
  const initialState = window.initialState || {};
  postStore = PostStore.fromJS(initialState);
  appStore = AppStore.fromJS(initialState);
  // 监听窗口变化
  appStore.listenWindow();
}

export default (props) => {
  const { context, location } = props;
  return (
    <section>
      <DevTool />
      <Provider
        appStore={props.appStore || appStore}
        postStore={props.postStore || postStore}
      >
        <Router context={context} location={location}>
          <Switch>
            <HomeLayout exact path="/" component={Home} />
            <BlogLayout path="/post/:slug" component={Post} />
            <DefaultLayout path="/blogs/" component={Blog} />
            <DefaultLayout path="/about/" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </section>
  );
};
