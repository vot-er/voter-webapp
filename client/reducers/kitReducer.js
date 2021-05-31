import {MERGE_KITS, LOGOUT} from '../constants/actionTypes';
import {mergeItems} from '../utils/normalize';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function authReducer(state = initialState.kits, action) {
  switch (action.type) {
  case LOGOUT:
    return initialState.kits;
  case MERGE_KITS:
    return mergeItems(state, action.items);
  default:
    return state;
  }
}
