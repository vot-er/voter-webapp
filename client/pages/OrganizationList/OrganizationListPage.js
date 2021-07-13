import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {toArray} from '../../utils/normalize';
import CreateOrganizationForm from './components/CreateOrganizationForm';
import './organization-list-page.scss';
import {getAll as getOrganizations, create as createOrganization} from '../../actions/organizationActions';

export class OrganizationListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name
      }
    };
  }
  componentDidMount() {
    this.props.getOrganizations();
  }
  onFormChange(field, value) {
    this.setState({
      form: Object.assign({}, this.state.form, {[field]: value})
    });
  }
  async onFormSubmit() {
    try {
      await this.props.createOrganization(this.state.form);
    } catch(err) {
      console.error(err);
    }
  }
  renderOrganization(organization) {
    return <div key={organization.id}>
      {organization.name}
    </div>;
  }
  render() {
    const {organizations} = this.props;
    const {form} = this.state;
    return (
      <div className="fill fill-height flex-column organization-list-page">
        <CreateOrganizationForm form={form} onChange={this.onFormChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)} />
        <br />
        <br />
        {organizations.map(organization => this.renderOrganization(organization))}
      </div>
    );
  }
}

OrganizationListPage.propTypes = {
  createOrganization: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    organizations: toArray(state.organizations)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createOrganization: bindActionCreators(createOrganization, dispatch),
    getOrganizations: bindActionCreators(getOrganizations, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationListPage));
