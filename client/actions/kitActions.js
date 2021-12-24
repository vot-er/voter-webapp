import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleErrorWithLogout} from '../utils/error';

export function getOne(kitId) {
  return async function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/kits/${kitId}`)
        .then(response => dispatch({
          type: types.MERGE_KITS,
          items: [response.data.data]
        }))
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function getAll() {
  return async function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.get('/api/kits')
        .then(response => dispatch({
          type: types.MERGE_KITS,
          items: response.data.data
        }))
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function create(body) {
  return async function(dispatch) {
    const {data} = await axios.post('/api/kits', body);
    dispatch({
      type: types.MERGE_KITS,
      items: [data.data]
    });
    return data;
  };
}

export function patch(kitId, body) {
  return async function(dispatch) {
    const {data} = await axios.patch(`/api/kits/${kitId}`, body);
    dispatch({
      type: types.MERGE_KITS,
      items: [data.data]
    });
    return data;
  };
}


export function bulkAssign(body) {
  return async function() {
    const {data} = await axios.post('/api/kits/bulk-assign', body);
    return data;
  };
}

export function bulkShip(body) {
  return (async function() {
    const {data} = await axios.post('/api/kits/bulk-ship', body);
    return data;
  })();
}
