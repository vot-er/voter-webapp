import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {TopNav} from 'Components';
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
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage));
