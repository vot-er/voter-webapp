import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {EmptyNavbar} from 'Components';
import './edit-organization-page.scss';
import {patch as editOrganization, getOne as getOrganization} from '../../actions/organizationActions';
import {goTo} from '../../actions/routerActions';
import EditOrganizationForm from './components/EditOrganizationForm';

export class EditOrganizationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      organization: null,
      isSubmitting: false,
    };
  }
  static getDerivedStateFromProps(props) {
    const organizationId = props.match.params.organizationId;
    const organization = props.organizationsById[organizationId];
    return {
      organization
    };
  }
  getOrganization() {
    console.log(`props=${JSON.stringify(this.props.editOrganization)}`);
    console.log(`action=${JSON.stringify(getOrganization)}`);
    this.props.getOrganization(this.props.match.params.organizationId);
  }
  componentDidMount(){
    console.log(`${this.props.match.params.organizationId}`);
    this.getOrganization();
  }
  onFormChange(field, value) {
    this.setState({
      [field]: value
    });
  }
  async handleSubmit() {
    try {
      const {
        addressLine1, addressLine2, zipcode, city, state
      } = this.state;
      await this.props.editOrganization({
        shippingAddress: {
          addressLine1, addressLine2, zipcode, city, state
        }
      });
      this.props.goTo('/organizations');
    } catch(err) {
      console.error(err);
    }
  }
  render() {
    const {organization} = this.state;
    if (!organization) return null;
    return (
      <div className="fill fill-height flex-column edit-organization-page">
        <EmptyNavbar />
        <div className="fill edit-organization-page__content">
          <div className="edit-organization__form-container">
            <div>
              <EditOrganizationForm form={this.state} onChange={this.onFormChange.bind(this)} onSubmit={this.handleSubmit.bind(this)}/>
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


function mapDispatchToProps(dispatch) {
  return {
    getOrganization: bindActionCreators(getOrganization, dispatch),
    editOrganization: bindActionCreators(editOrganization, dispatch),
    goTo: bindActionCreators(goTo, dispatch)
  };
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(EditOrganizationPage));
