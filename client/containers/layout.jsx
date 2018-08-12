import React from 'react';

import { Route } from 'react-router-dom';

import HScroll from '../widgets/hscroll/index.jsx';
import CommonHeader from './header/header.jsx';
import HomeHeader from './home/header';
import HomeFooter from './home/footer';

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className="wrapper horizontal-wrapper">
          <CommonHeader />
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

export const HomeLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <HScroll className="wrapper horizontal-wrapper home-wrapper">
          <HomeHeader />
          <Component {...matchProps} />
          <HomeFooter />
        </HScroll>
      )}
    />
  );
};
