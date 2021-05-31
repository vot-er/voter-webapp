import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {TopNav} from 'Components';
import './kit-list-page.scss';

export class KitsListPage extends React.Component {
  static getDerivedStateFromProps(props) {
    const taskId = props.match.params.taskId;
    const task = props.tasksById[taskId];
    return {
      task
    };
  }
  render() {
    const {task} = this.state;
    if (!task) return null;
    return (
      <div className="fill">
        <TopNav title="Task"/>
        <div className="fill task-page">
          <div>{task.title}</div>
        </div>
      </div>
    );
  }
}

KitsListPage.propTypes = {
  tasksById: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    kits: state.tasks.allIds
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(KitsListPage));
