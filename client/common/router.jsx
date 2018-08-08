'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

import AppStore from '../stores/app';
import PostStore from '../stores/post';
import Home from '../pages/Home';
import Post from '../pages/Post';
// import List from '../pages/List';
import '../styles/site.scss';

const Router = __CLIENT__ ? BrowserRouter : StaticRouter;

const appStore = new AppStore();
let postStore;

if (__CLIENT__) {
  appStore.listenWindow();
  const initialState = window.initialState || {};
  postStore = PostStore.fromJS(initialState.posts || []);
}

export default props => (
  <section>
    <DevTool />
    <Provider appStore={appStore} postStore={props.store || postStore} >
      <Router context={props.context}>
        <Switch>
          <Route path="/post/:slug" component={Post} />
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/list" component={List} /> */}
        </Switch>
      </Router>
    </Provider>
  </section>
);
