import React from 'react';
import ReactDom from 'react-dom';
import Listen from './hscroll';

class HScroll extends React.Component {
  _onChange = (e) => {
    this.props.onChange && this.props.onChange(e);
  }

  componentDidMount() {
    this._mousewheel = Listen(this.container, (e) => {
      this._onChange(e);
    });
  }

  componentWillUnMount() {
    this._mousewheel && this._mousewheel.remove();
  }

  render() {
    const { children, data } = this.props;
    return (
      <div
        className={this.props.className}
        style={this.props.style}
        ref={(e) => { this.container = e; }}
        {...data}
      >
        {React.Children.map(this.props.children, (element, idx) => React.cloneElement(element, { ref: idx }))}
      </div>
    );
  }
}

export default HScroll;
