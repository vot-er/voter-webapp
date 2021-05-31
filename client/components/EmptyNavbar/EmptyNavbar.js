import React from 'react';
import navLogo from '../../assets/nav-logo.png';
import './empty-navbar.scss';

// Since this component is simple and static, there's no parent container for it.
class EmptyNavbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-group-left">
          <div className="navbar__logo__container">
            Vot-ER
            <img src={navLogo} />
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyNavbar;
