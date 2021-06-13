import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {TopNav} from 'Components';
import {logout} from '../../actions/authActions';
import './account-page.scss';

export class HomePage extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <div className="fill">
        <TopNav title="Account"/>
        <div className="fill home-page">
          Change My Name
          <br/>
          Change My Password
          <br/>
          <a href="#" onClick={this.props.logout.bind(this)}>Logout</a>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage));
