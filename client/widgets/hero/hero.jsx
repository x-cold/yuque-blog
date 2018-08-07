import React, {Component} from 'react';
import {animatedScrollTo} from '../../effects/scroll';
import {formatDate} from '../../utilities/format';

import './hero.scss';

class Hero extends Component {

  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  render() {
    const { title,updated_at } = this.props;
    return (
      <div className='static hero'>
        <div className='hero__title-bar'>
          <div className='hero__title-bar__content'>
            <h1>{title}</h1>
            <div className="hero-intro">
              {/* <span className="hero-tag">{ primary_tag && primary_tag.name || '未分类' }</span> */}
              <span className="hero-date">{ formatDate(updated_at) }</span>
            </div>
          </div>
        </div>
        {/* <div className='hero-image'>
          <img src={feature_image}/>
        </div> */}
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

  // componentDidMount() {
  //   const node = document.getElementsByClassName('wrapper')[0];
  //   node.scrollTop = 0;
  // }


  scroll() {
    animatedScrollTo(this.props.ui.windowHeight - 70);
  }
}

export default Hero
