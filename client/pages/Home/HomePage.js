import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router-dom';
import {TaskList, TopNav} from 'Components';
import {getAll as getTasks} from '../../actions/taskActions';
import {selectTasks} from '../../selectors';
import './home-page.scss';

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.getTasks();
  }
  render() {
    const {tasks} = this.props;
    return (
      <div className="fill">
        <TopNav title="Scoreboard"/>
        <div className="fill home-page">
          This is my scoreboard.
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  getTasks: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    tasks: selectTasks(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTasks: bindActionCreators(getTasks, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage));
