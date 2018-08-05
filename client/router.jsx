'use strict';

import React from 'react';
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

import AppStore from './stores/app';
import PostStore from './stores/post';
import Home from './pages/Home';
import './styles/site.scss';

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
        <Route exact path="/" component={Home} />
      </Router>
    </Provider>
  </section>
);
