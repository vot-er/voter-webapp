import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import kits from './kitReducer';
import organizations from './organizationReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  alert,
  auth,
  kits,
  organizations,
  router: connectRouter(history)
});

export default rootReducer;
