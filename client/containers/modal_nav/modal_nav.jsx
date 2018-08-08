import React from 'react';
import PropTypes from 'prop-types';

import './modal_nav.scss';

function ModalNav(props) {
  const active = props.isExpanded;
  const list = props.buttons.map((button, i) => {
    const { url, name } = button;
    const buttonActive = window.location.pathname === url;
    return (
      <li key={i} className="nav-item" >
        <a
          className={buttonActive && 'active' || ''}
          href={url}
          onClick={() => { props.toggleExpandedState(true); }}
        >
          {name}
        </a>
      </li>
    );
  });

  return (
    <div className={`modal-nav${active ? ' active' : ''}`}>
      {/* <div className='close-button' onClick={props.toggleExpandedState}>
        <Close />
      </div> */}
      <ul className="nav-list">
        {list}
      </ul>
    </div>
  );
}

ModalNav.propTypes = {
  buttons: PropTypes.array.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

export default ModalNav;
