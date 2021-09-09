import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './errors.scss';
import {hideError} from '../../actions/alertActions';

class ErrorCard extends React.Component {
  render() {
    const err = this.props.err;
    const hideErr = this.props.hideError;
    let klass = '';
    if (err) {
      klass = 'show';
      setTimeout(function() {
        hideErr();
      }, 5000);
    }
    return <div id={'error-card'} className={klass}>{err}</div>;
  }
}

ErrorCard.propTypes = {
  err: PropTypes.string,
  hideError: PropTypes.func
};

const mapStateToProps = state => ({
  err: state.alert.err
});

const mapDispatchToProps = dispatch => ({
  hideError: () => dispatch(hideError())
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorCard);
