import React from 'react';
import PropTypes from 'prop-types';
import './task-list.scss';
import {TaskItem} from 'Components';


class TaskList extends React.Component {
  render() {
    const {tasks, heading} = this.props;
    var taskItems = tasks.map(task => <TaskItem key={task._id} task={task} />);
    return (
      <div className="task-list">
        <div className="task-list__header">
          {heading}
        </div>
        <div className="task-list__items">
          {taskItems}
        </div>
      </div>
    );
  }
}

TaskList.propTypes = {
  heading: PropTypes.string,
  tasks: PropTypes.array.isRequired
};

export default TaskList;
