import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as authActions from '../../actions/authActions';
import {bindActionCreators} from 'redux';
import navLogo from '../../assets/nav-logo.png';
import './side-nav.scss';

// Since this component is simple and static, there's no parent container for it.
class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__top">
          <div className="sidebar__workspace">            <img className="sidebar__logo"src={navLogo} />
          </div>
        </div>
        <div className="sidebar__items">
          <Link className="sidebar__item" to="/">
            Scoreboard
          </Link>
          <Link className="sidebar__item" to="/team">
            Team
          </Link>
          <Link className="sidebar__item" to="/badges">
            Badges
          </Link>
          <br />
          <Link className="sidebar__item" to="/account">
            Account
          </Link>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    pathname: state.router.location.pathname,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
