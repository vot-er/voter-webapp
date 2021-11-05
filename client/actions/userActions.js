import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleErrorWithLogout} from '../utils/error';
import { displayError } from './alertActions';

export function get() {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.get('/api/users')
        .then(response => dispatch({
          type: types.MERGE_USERS,
          items: response.data
        }))
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function getOne(userId) {
  return async function() {
    const {data} = await axios.get(`/api/users/${userId}`);
    return data;
  };
}


export function updateMyProfile(patch) {
  return async function(dispatch) {
    try {
      const {data: user} = await axios({
        method: 'PATCH',
        url: '/api/users/me',
        data: patch
      });
      dispatch({
        type: types.MERGE_USERS,
        items: [user]
      });
    } catch(err) {
      dispatch(displayError(err));
    }
  };
}


export function updateOrganization(userId, organizationId) {
  return async function(dispatch) {
    try {
      await axios({
        method: 'PUT',
        url: `/api/users/${userId}/organization`,
        data: {
          organization: organizationId
        }
      });
    } catch(err) {
      dispatch(displayError(err));
      throw err;
    }
  };
}
