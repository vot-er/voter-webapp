import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleErrorWithLogout} from '../utils/error';

export function getAll() {
  return async function(dispatch) {
    return new Promise((resolve, reject) => {
      axios.get('/api/kits')
        .then(response => dispatch({
          type: types.MERGE_KITS,
          items: response.data
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
