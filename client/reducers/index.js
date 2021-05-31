import { combineReducers } from 'redux';
import auth from './authReducer';
import tasks from './taskReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  auth,
  tasks,
  router: connectRouter(history)
});

export default rootReducer;
