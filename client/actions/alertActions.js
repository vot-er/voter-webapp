import * as types from "../constants/actionTypes";

export function displayError(err) {
  return async function (dispatch) {
    dispatch({
      type: types.DISPLAY_ERROR,
      err: err.message,
    });
  };
}

export function hideError() {
  return async function (dispatch) {
    dispatch({
      type: types.HIDE_ERROR,
    });
  };
}
