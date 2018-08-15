import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import './index.scss';

function ModalNav(props) {
  const { location = {} } = props;
  const active = props.isExpanded;
  const list = props.buttons.map((button) => {
    const { url, name } = button;
    const buttonActive = location.pathname === url;
    return (
      <li key={`nav-item-${url}`} className="nav-item" >
        <Link
          className={buttonActive && 'active' || ''}
          to={url}
          onClick={() => { props.toggleExpandedState(true); }}
        >
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div className={`modal-nav${active ? ' active' : ''}`}>
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

export default withRouter(ModalNav);
