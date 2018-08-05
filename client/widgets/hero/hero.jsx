import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setLoadedImage} from '../../actions/ui';
import {animatedScrollTo} from '../../effects/scroll';
import {formatDate} from '../../utilities/format';

import siteInfo from '../../info.json';
import {Down} from '../icons/icons.jsx';

import './hero.scss';

class Hero extends Component {

  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  render() {
    const { title, text, ui, date, feature_image, primary_tag } = this.props;
    return (
      <div className='static hero'>
        <div className='hero__title-bar'>
          <div className='hero__title-bar__content'>
            <h1>{title}</h1>
            <div className="hero-intro">
              <span className="hero-tag">{ primary_tag && primary_tag.name || '未分类' }</span>
              <span className="hero-date">{ formatDate(date) }</span>
            </div>
          </div>
        </div>
        <div className='hero-image'>
          <img src={feature_image}/>
        </div>
      </div>
    );
    // return (
    //   <div className="post-desc">
    //     <h2 className="post-title">{title}</h2>
    //     <div className="post-date">
    //       <span></span>
    //     </div>
    //   </div>
    // )
  }

  componentDidMount() {
    const node = document.getElementsByClassName('wrapper')[0];
    node.scrollTop = 0;
  }

  scroll() {
    animatedScrollTo(this.props.ui.windowHeight - 70);
  }
}

export default connect(state => ({
  ui: state.ui
}))(Hero);
