import {DISPLAY_ERROR, HIDE_ERROR} from '../constants/actionTypes';
import initialState from './initialState';

// IMPORTANT: Note that with Redux, state should NEVER be changed.
// State is considered immutable. Instead,
// create a copy of the state passed and set new values on the copy.
// Note that I'm using Object.assign to create a copy of current state
// and update values on the copy.
export default function alertReducer(state = initialState.alert, action) {
  switch (action.type) {
  case DISPLAY_ERROR:
    return {
      ...state,
      err: action.err
    };

  case HIDE_ERROR:
    return {
      ...state,
      err: null
    };

  default:
    return state;
  }
}
