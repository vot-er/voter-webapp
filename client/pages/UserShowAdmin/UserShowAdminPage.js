import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import {
  getOne as getUser,
  updateOrganization as updateUserOrganization,
} from "../../actions/userActions";
import { TopNav, SubmitButton } from "Components";
import "./user-show-admin-page.scss";

export class UserShowAdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isSubmitting: false,
      organizationId: "",
    };
  }
  async getUser() {
    const user = await this.props.getUser(this.props.match.params.userId);
    this.setState({
      user,
    });
  }
  componentDidMount() {
    this.getUser();
  }
  renderOrganization() {
    const { user } = this.state;
    if (!user) return null;
    if (!user.Organization) return "none";
    return `${user.Organization.name} - ${user.Organization.id}`;
  }
  render() {
    const { user, isSubmitting, organizationId } = this.state;
    if (!user) {
      return <div>No user found with that ID.</div>;
    }
    return (
      <div className="fill">
        <TopNav title="User" />
        <div className="fill task-page">
          <div>User ID: {user.id}</div>
          <div>User Name: {user.name}</div>
          <div>Organization: {this.renderOrganization()} </div>
          <div>
            Reassign to organization:
            <form onSubmit={this.submitAssignOrganization.bind(this)}>
              <input
                className="form__control"
                placeholder="Put organization id here."
                value={organizationId}
                onChange={(e) =>
                  this.setState({ organizationId: e.target.value })
                }
              />
              <SubmitButton value="Assign" isSubmitting={isSubmitting} />
            </form>
          </div>
        </div>
      </div>
    );
  }

  async submitAssignOrganization(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.isSubmitting) return;
    try {
      this.setState({
        isSubmitting: true,
      });
      const { organizationId } = this.state;
      const { match } = this.props;
      await this.props.updateUserOrganization(
        match.params.userId,
        organizationId
      );
      await this.getUser();
      this.setState({
        isSubmitting: false,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        isSubmitting: false,
      });
    }
  }
}

UserShowAdminPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUserOrganization: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    getUser: bindActionCreators(getUser, dispatch),
    updateUserOrganization: bindActionCreators(
      updateUserOrganization,
      dispatch
    ),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(UserShowAdminPage));
