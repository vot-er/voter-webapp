import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";
import { bindActionCreators } from "redux";
import "./top-nav.scss";

// Since this component is simple and static, there's no parent container for it.
class TopNav extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className="top-nav">
        <div className="top-nav__title">{title}</div>
      </div>
    );
  }
}

TopNav.propTypes = {
  title: PropTypes.string,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
