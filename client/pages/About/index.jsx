import React, { Component } from 'react';
import Parallax from 'parallax-js';
import { observer, inject } from 'mobx-react';

import HScroll from '../../widgets/hscroll/index.jsx';
import './index.scss';

// 禁用垂直方向的手势
Parallax.prototype.onMouseMove = function (event) {
  let { clientX, clientY } = event;

  // reset input to center if hoverOnly is set and we're not hovering the element
  if (this.hoverOnly &&
    ((clientX < this.elementPositionX || clientX > this.elementPositionX + this.elementWidth) ||
      (clientY < this.elementPositionY || clientY > this.elementPositionY + this.elementHeight))) {
    this.inputX = 0;
    this.inputY = 0;
    return;
  }

  if (this.relativeInput) {
    // Clip mouse coordinates inside element bounds.
    if (this.clipRelativeInput) {
      clientX = Math.max(clientX, this.elementPositionX);
      clientX = Math.min(clientX, this.elementPositionX + this.elementWidth);
      clientY = Math.max(clientY, this.elementPositionY);
      clientY = Math.min(clientY, this.elementPositionY + this.elementHeight);
    }
    // Calculate input relative to the element.
    if (this.elementRangeX && this.elementRangeY) {
      this.inputX = (clientX - this.elementPositionX - this.elementCenterX) / this.elementRangeX;
      // this.inputY = (clientY - this.elementPositionY - this.elementCenterY) / this.elementRangeY
      this.inputY = 0; // 禁用 Y 轴的反馈
    }
  } else if (this.windowRadiusX && this.windowRadiusY) {
    // Calculate input relative to the window.
    this.inputX = (clientX - this.windowCenterX) / this.windowRadiusX;
    this.inputY = (clientY - this.windowCenterY) / this.windowRadiusY;
  }
};

@inject('appStore')
@inject('postStore')
@observer

class About extends Component {
  componentDidMount() {
    const scene = document.querySelector('.parallax');
    const parallaxInstance = new Parallax(scene, {
      relativeInput: true,
      originY: 0,
    });
    return parallaxInstance;
  }

  render() {
    const { appStore } = this.props;
    const { ui = {} } = appStore;
    const backgroundHeight = ui.windowHeight - 70 - (window.isMobile ? 0 : 30) - (ui.windowWidth < 768 ? 0 : 30);
    const imgHeight = backgroundHeight - 80;

    return (<HScroll
      className="page-container about-us"
      style={{
        height: `${backgroundHeight}px`,
        width: `${ui.windowWidth - (window.isMobile ? 72 : 90 + 30)}px`,
      }}
    >
      <div className="introduction">
        <div className="logo">
          <img src="https://img.alicdn.com/tfs/TB1OubUdv5TBuNjSspmXXaDRVXa-516-134.png" />
        </div>
        <div className="desc">
          致力于推动改善大阿里集团基础运维工具的效率和体验， 级数据可视化产品的设计和研发
        </div>
      </div>
      <div className="parallax-box">
        <div className="parallax">
          <div className="show-board show-board-1" data-depth="1" data-scalar-x="10" data-scalar-y="10">
            <img
              style={{ height: `${imgHeight}px` }}
              src="https://gw.alicdn.com/tfs/TB1lYCmdkyWBuNjy0FpXXassXXa-4555-1000.png"
            />
          </div>
          <div className="show-board show-board-2" data-depth="0.8" data-scalar-x="8" data-scalar-y="8">
            <img
              style={{ height: `${imgHeight}px` }}
              src="https://gw.alicdn.com/tfs/TB1Ltyqdf1TBuNjy0FjXXajyXXa-4555-1000.png"
            />
          </div>
          <div className="show-board show-board-3" data-depth="0.6" data-scalar-x="6" data-scalar-y="6">
            <img
              style={{ height: `${imgHeight}px` }}
              src="https://gw.alicdn.com/tfs/TB1RdmjdXOWBuNjy0FiXXXFxVXa-4555-1000.png"
            />
          </div>
          <div className="show-board show-board-4" data-depth="0.4" data-scalar-x="4" data-scalar-y="4">
            <img
              style={{ height: `${imgHeight}px` }}
              src="https://gw.alicdn.com/tfs/TB163OydamWBuNjy1XaXXXCbXXa-4555-1000.png"
            />
          </div>
          <div className="show-board show-board-5" data-depth="0.2" data-scalar-x="2" data-scalar-y="2">
            <img
              style={{ height: `${imgHeight}px` }}
              src="https://gw.alicdn.com/tfs/TB1ogOydamWBuNjy1XaXXXCbXXa-4555-1000.png"
            />
          </div>
        </div>
      </div>
    </HScroll>);
  }
}

export default function Con(props) {
  return (<div className="common-page">
    <div className="page-title">
      About us
    </div>
    <About {...props} />
  </div>);
}
