import React, { PureComponent } from 'react';
import { formatDate } from '../../utils/format';

import './index.scss';

class Hero extends PureComponent {
  render() {
    const { title, updated_at } = this.props;
    return (
      <div className="hero">
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
  }
}

export default Hero;
