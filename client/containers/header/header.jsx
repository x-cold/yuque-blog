import React, {Component} from 'react';
import ReactDom from 'react-dom';
import classNames from 'classnames';

import {MainLogo, Falafel, HamburgerCross} from '../../widgets/icons/icons.jsx';
import ModalNav from '../modal_nav/modal_nav.jsx';
import {headerNav} from '../../info.json';

import './header.scss';

export default class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
    this.toggleExpandedState = this.toggleExpandedState.bind(this);
  }

  render() {
    const {windowHeight, scrollTop, scrollDirection} = this.props.ui;
    const isTransparent = windowHeight - 70 > scrollTop;
    const isHidden = (scrollTop > (windowHeight - 70)) && (scrollDirection === 'down');

    const cls = classNames({
      'header': true,
      'header--expanded': this.state.isExpanded,
      'header--hidden': isHidden,
      'header--transparent': isTransparent
    });

    return (
      <header className={cls}>
        <nav className='header__icon header__falafel' onClick={this.toggleExpandedState}>
          <HamburgerCross ref={(e) => { this.btn = e }} />
        </nav>
        <ModalNav
          isExpanded={this.state.isExpanded}
          buttons={headerNav}
          toggleExpandedState={this.toggleExpandedState}
        />
      </header>);
  }

  toggleExpandedState(redirect) {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
    this.btn.toggle();
  }
}
