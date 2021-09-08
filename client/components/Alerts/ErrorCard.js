import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './errors.scss';
import {hideError} from '../../actions/alertActions';

class ErrorCard extends React.Component {
  render() {
    const err = this.props.err;
    const hideErr = this.props.hideError;
    this.click = event => {
      hideErr()
    };
    if (!err) {
      return null;
    } else {
      return <div className={'error-card'}>
        {err}<br />
        <button onClick={this.click}>Hide Error</button>
      </div>;
    }
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
