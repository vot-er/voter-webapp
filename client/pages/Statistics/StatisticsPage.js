import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "./statistics-page.scss";

export class HomePage extends React.Component {
  render() {
    return <div className="fill statistics-page">Stats</div>;
  }
}

HomePage.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
