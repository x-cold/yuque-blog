import React from 'react';
import Listen from './hscroll';

class HScroll extends React.Component {
  componentDidMount() {
    this._mousewheel = Listen(this.container, (e) => {
      this.onChange(e);
    });
  }

  componentWillUnmount() {
    this._mousewheel && this._mousewheel.remove();
  }

  onChange = (e) => {
    this.props.onChange && this.props.onChange(e);
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
        {
          React.Children
            .map(children, (element, idx) => React
              .cloneElement(element, { ref: idx })
            )
        }
      </div>
    );
  }
}

export default HScroll;
