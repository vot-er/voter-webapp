import { combineReducers } from 'redux';
import auth from './authReducer';
import kits from './kitReducer';
import { connectRouter } from 'connected-react-router';

const rootReducer = history => combineReducers({
  auth,
  kits,
  router: connectRouter(history)
});

export default rootReducer;
