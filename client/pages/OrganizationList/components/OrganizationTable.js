import React from 'react';
import DataTable from 'react-data-table-component';
import PropTypes from 'prop-types';
import {goTo} from '../../../actions/routerActions';
import {selectOrganizations} from '../../../selectors';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class OrganizationTable extends React.Component {
  handleRowClicked = row => this.props.goTo(`/organizations/${row.id}`);

  render() {
    const columns = [
      { name: 'Organization', selector: 'name', sortable: true, style: {
        color: 'blue',
        textDecoration: 'underline',
        '&:hover': {
          cursor: 'pointer',
        },
      }, },
      { name: 'Member count', selector: 'memberCount', sortable: true },
      { name: 'Public', selector: 'public', cell: row => (row.public ? 'PUBLIC' : 'PRIVATE')},
    ];
    const { organizations } = this.props;
    return <DataTable columns={columns} data={organizations} onRowClicked={ this.handleRowClicked } />;
  }
}

OrganizationTable.propTypes = {
  organizations: PropTypes.array.isRequired,
  goTo: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    organizations: selectOrganizations(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goTo: bindActionCreators(goTo, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationTable));
