import React from 'react';

import { Route } from 'react-router-dom';

import HScroll from '../../widgets/hscroll';
import CommonHeader from '../Header';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

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
