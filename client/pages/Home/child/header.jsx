import React, {Component} from 'react';
import {headerNav} from '../../../info.json';

import './header.scss';

export default class HomeHeader extends Component {
  render() {
    return <div className="home-navigator">
      <ul className="nav-list">
        {
          headerNav.map((button, index) => <li
            className="nav-item"
            key={button.url}
          >
            <a href={button.url} className={ index === 0 && 'active' || '' }>{button.name}</a>
          </li>)
        }
      </ul>
      <div className="logo">
        <img src="https://img.alicdn.com/tfs/TB1vc_JdpuWBuNjSspnXXX1NVXa-718-186.png"/>
      </div>
    </div>
  }
}
