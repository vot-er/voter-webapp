import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeUserRole} from '../../actions/adminActions';
import * as userActions from '../../actions/userActions';
import {selectUsers} from '../../selectors';
import {UserList} from '../../components';
import AdminUserDropdown from './components/AdminUserDropdown';
import './admin-page.scss';

class AdminPage extends React.Component {
  setUserRole(userId, role) {
    this.props.changeUserRole(userId, role)
      .then(() => this.props.userActions.get());
  }
  render() {
    const {users} = this.props;
    return (
      <div className="page-body">
        <div className="container container--small">
          <div className="card card--spaced">
            <div className="card__heading">
              <span className="card__title">
                Users
              </span>
            </div>
            <div className="card__body">
              <UserList
                getUsers={this.props.userActions.get.bind(this)}
                users={users}
                dropdown={AdminUserDropdown}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminPage.propTypes = {
  changeUserRole: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    users: selectUsers(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeUserRole: bindActionCreators(changeUserRole, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
    chargeDailyPayments: bindActionCreators(chargeDailyPayments, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
