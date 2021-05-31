import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleErrorWithLogout} from '../utils/error';

export function getAll() {
  return async function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: types.MERGE_KITS,
        items: [{
          _id: 0,
          code: 'Test item',

        }]
      });
      return;
      axios.get('/api/kits')
        .then(response => dispatch({
          type: types.MERGE_KITS,
          items: response.data
        }))
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}
