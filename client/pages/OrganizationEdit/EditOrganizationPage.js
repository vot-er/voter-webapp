import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { EmptyNavbar } from "Components";
import "./edit-organization-page.scss";
import {
  getOne as getOrganization,
  patch as editOrganization,
} from "../../actions/organizationActions";
import { goTo } from "../../actions/routerActions";
import EditOrganizationForm from "./components/EditOrganizationForm";

class EditOrganizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      public: null,
      customUrl: null,
    };
  }
  static getDerivedStateFromProps(props) {
    const organizationId = props.match.params.organizationId;
    const organization = props.organizationsById[organizationId];
    if (!organization) return null;
    return {
      orgId: organization.id,
      orgName: organization.name,
      orgPublic: organization.public,
      orgCustomUrl: organization.customUrl,
    };
  }
  getOrganization() {
    this.props.getOrganization(this.props.match.params.organizationId);
  }
  componentDidMount() {
    this.getOrganization();
  }
  onFormChange(field, value) {
    if (field === "public") {
      const { public: isPublic, orgPublic } = this.state;
      const toggledPublic = isPublic === null ? !orgPublic : !isPublic;
      this.setState({ public: toggledPublic });
    } else {
      this.setState({
        [field]: value,
      });
    }
  }
  async handleSubmit() {
    try {
      const {
        name,
        public: isPublic,
        orgId,
        orgName,
        orgIsPublic,
        customUrl,
        orgCustomUrl,
      } = this.state;
      const updatedOrg = {
        name: name ?? orgName,
        public: isPublic ?? orgIsPublic,
        customUrl: customUrl ?? orgCustomUrl,
      };
      await this.props.editOrganization(orgId, updatedOrg);
      this.props.goTo("/organizations");
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    const {
      orgName,
      orgPublic,
      orgCustomUrl,
      name,
      public: isPublic,
      customUrl,
    } = this.state;
    if (!orgName) return null;
    return (
      <div className="fill fill-height flex-column edit-organization-page">
        <EmptyNavbar />
        <div className="fill edit-organization-page__content">
          <div className="edit-organization__form-container">
            <div>
              <EditOrganizationForm
                form={{
                  name,
                  public: isPublic,
                  customUrl,
                  orgName,
                  orgPublic,
                  orgCustomUrl,
                }}
                onChange={this.onFormChange.bind(this)}
                onSubmit={this.handleSubmit.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditOrganizationPage.propTypes = {
  getOrganization: PropTypes.func.isRequired,
  editOrganization: PropTypes.func.isRequired,
  organizationsById: PropTypes.object.isRequired,
  goTo: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    organizationsById: state.organizations.byId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrganization: bindActionCreators(getOrganization, dispatch),
    editOrganization: bindActionCreators(editOrganization, dispatch),
    goTo: bindActionCreators(goTo, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditOrganizationPage)
);
