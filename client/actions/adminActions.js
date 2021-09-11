import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleError} from '../utils/error';
import { displayError } from './alertActions';

export function changeUserRole(userId, newRole) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/users/${userId}/role`, {
        role: newRole
      })
        .then(res => {
          if (res.status >= 400) {
            return Promise.reject(res.error);
          }
          dispatch({
            type: types.ADMIN_UPDATE_USER_ROLE,
            userId,
            newRole
          });
          resolve();
        })
        .catch(handleError(reject));
    });
  };
}

export function deleteUser(userId) {
  return async function(dispatch) {
    try {
      await axios({
        method: 'DELETE',
        url: `/api/users/${userId}`
      });
      dispatch({
        type: types.REMOVE_USER,
        id: userId
      });
    } catch(err) {
      dispatch(displayError(err));
    }
  };
}
