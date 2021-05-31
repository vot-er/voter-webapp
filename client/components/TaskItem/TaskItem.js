import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './task-item.scss';


class TaskListItem extends React.Component {
  render() {
    const {task} = this.props;
    return (
      <Link className="task-item flex-row" to={`/tasks/${task._id}`}>
        <div className="flex-row__group flex-row__group--left">{task.title}</div>
        <div className="flex-row__group flex-row__group--right">
          <div className="flex-row" style={{justifyContent: 'flex-end'}}>
            {task.link ? <a href={task.link} target="_blank" rel="noreferrer">Go</a> : null}
            <div>3 days left</div>
          </div>
        </div>
      </Link>
    );
  }
}

TaskListItem.propTypes = {
  task: PropTypes.object.isRequired
};

export default TaskListItem;
