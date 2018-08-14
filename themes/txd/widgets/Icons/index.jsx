import React, { Component } from 'react';

import svgIconConfig from './svgicon_config';
import svgIcon from './svgicon';

const noop = function noop() {};

const mina = window.mina || noop;

export function Falafel() {
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

export function Close() {
  return (
    <svg viewBox="0 0 100 100">
      <line
        x1="6"
        y1="94"
        x2="94"
        y2="6"
        stroke="black"
        strokeWidth="8"
      />
      <line
        x1="6"
        y1="6"
        x2="94"
        y2="94"
        stroke="black"
        strokeWidth="8"
      />
    </svg>
  );
}

export class HamburgerCross extends Component {
  constructor(props) {
    super(props);
    this.singleHamburgerCross = null;
    this.container = null;
    this.id = `hamburgerCross-${Date.now().toString(36)}`;
  }

  componentDidMount() {
    const { container, id } = this;
    this.singleHamburgerCross = new svgIcon(container, svgIconConfig, {
      id,
      easing: mina.ease,
      speed: 300,
    });
  }

  toggle() {
    this.singleHamburgerCross && this.singleHamburgerCross.toggle(true);
  }

  render() {
    return (
      <span>
        <svg
          id={this.id}
          style={{ display: 'none' }}
          width="64"
          height="64"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinejoin="bevel"
              d="m 5.0916789,15.818994 53.8166421,0"
            />
            <path
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinejoin="bevel"
              d="m 5.1969746,31.909063 53.8166424,0"
            />
            <path
              fill="none"
              stroke="#000"
              strokeWidth="5"
              strokeLinejoin="bevel"
              d="m 5.0916788,47.95698 53.8166422,0"
            />
          </g>
        </svg>
        <span
          data-icon-name="hamburgerCross"
          ref={(e) => { this.container = e; }}
        />
      </span>
    );
  }
}
