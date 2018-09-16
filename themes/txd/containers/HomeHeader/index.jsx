import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import './index.scss';
import CommonHeader from '../Header';

@inject('appStore')
@observer
export default class HomeHeader extends Component {
  PCHeader(navigators) {
    return (
      <ul className="nav-list" >
        {
          navigators.map((button, index) => (<li
            className="nav-item"
            key={button.url}
          >
            <Link
              to={button.url}
              className={index === 0 && 'active' || ''}
            >
              {button.name}
            </Link>
          </li>))
        }
      </ul>
    )
  }
  MoblieHeader() {
    return <CommonHeader></CommonHeader>
  }
  render() {
    const { appStore } = this.props;
    const { config = {} } = appStore;
    const { navigators = [] } = config;
    const isMobile = window.isMobile;
    return (
      <div className="home-navigator">
        { isMobile ? this.MoblieHeader() : this.PCHeader(navigators)}
        <div className="logo">
          <img
            src="//img.alicdn.com/tfs/TB1vc_JdpuWBuNjSspnXXX1NVXa-718-186.png"
          />
        </div>
      </div>
    );
  }
}
