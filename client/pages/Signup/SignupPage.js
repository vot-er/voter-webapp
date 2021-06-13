import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/authActions';
import * as routerActions from '../../actions/routerActions';
import SignupForm from './components/SignupForm';
import './signup-page.scss';
import navLogo from '../../assets/nav-logo.png';

export class LoginPage extends React.Component {
  signup = async data => {
    await this.props.authActions.signup(data);
    await this.props.routerActions.goTo('/signup/order');
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="fill signup-page">
        <div className="fill signup__content">
          <img src={navLogo} style={{maxHeight: 46, marginBottom: 12}}/>
          <SignupForm
            signup={this.signup}
            isAuthenticating={this.props.auth.isAuthenticating}
          />
        </div>
        <div className="signup__image"/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  authActions: PropTypes.object.isRequired,
  routerActions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
