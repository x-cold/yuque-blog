import React, { Component } from 'react';
import { formatDate } from '../../utils/format';

import './hero.scss';

class Hero extends Component {
  render() {
    const { title, updated_at } = this.props;
    return (
      <div className="static hero">
        <div className="hero__title-bar">
          <div className="hero__title-bar__content">
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
}

export default Hero;
