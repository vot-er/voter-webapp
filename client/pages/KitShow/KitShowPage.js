import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { TopNav } from "Components";
import "./kit-show-page.scss";

export class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
    };
  }
  static getDerivedStateFromProps(props) {
    const taskId = props.match.params.taskId;
    const task = props.tasksById[taskId];
    return {
      task,
    };
  }
  render() {
    const { task } = this.state;
    if (!task) return null;
    return (
      <div className="fill">
        <TopNav title="Task" />
        <div className="fill task-page">
          <div>{task.title}</div>
        </div>
      </div>
    );
  }
}

TaskPage.propTypes = {
  tasksById: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    tasksById: state.tasks.byId,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TaskPage)
);
