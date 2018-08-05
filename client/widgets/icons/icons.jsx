import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Snap from 'snapsvg';

import svgIconConfig from './svgicon_config';
import svgIcon from './svgicon';

export function Falafel(props) {
  const height = 8;
  const spacing = 24;
  const startY = (100 - (2 * spacing + 3 * height)) / 2;
  return (
    <svg viewBox="0 0 100 100">
      <g>
        <rect
          x="0"
          y={startY + 0}
          width="100"
          height={height}
          rx="4"
        />
        <rect x="0" y={startY + height + spacing} width="100" height={height} rx="4" />
        <rect x="0" y={startY + 2 * height + 2 * spacing} width="100" height={height} rx="4" />
      </g>
    </svg>
  );
}

export function Close(props) {
  return (
    <svg viewBox="0 0 100 100">
      <line x1="6" y1="94"
        x2="94" y2="6"
        stroke="black"
        strokeWidth="8" />
      <line x1="6" y1="6"
        x2="94" y2="94"
        stroke="black"
        strokeWidth="8" />
    </svg>
  )
}

export class HamburgerCross extends Component {
  constructor(props) {
    super(props);
    this.singleHamburgerCross = null;
    this.container = null;
  }

  componentDidMount() {
    const container = ReactDOM.findDOMNode(this.container);
    this.singleHamburgerCross = new svgIcon(container, svgIconConfig, {
      easing: mina.ease, speed: 300
    });
  }

  toggle() {
    this.singleHamburgerCross && this.singleHamburgerCross.toggle(true);
  }

  render() {
    return (
      <span
        data-icon-name="hamburgerCross"
        ref={(e) => { this.container = e; }}
      >
      </span>
    );
  }
}
