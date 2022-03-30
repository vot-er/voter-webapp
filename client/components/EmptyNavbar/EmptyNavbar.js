import React from "react";
import navLogo from "../../assets/nav-logo.png";
import "./empty-navbar.scss";

// Since this component is simple and static, there's no parent container for it.
class EmptyNavbar extends React.Component {
  render() {
    return (
      <div className="empty-navbar">
        <div className="navbar__logo__container">
          <img src={navLogo} className="navbar__logo" />
        </div>
      </div>
    );
  }
}

export default EmptyNavbar;
