import * as types from '../constants/actionTypes';
import axios from 'axios';
import {handleErrorWithLogout} from '../utils/error';

export function getAll() {
  return async function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch({
        type: types.MERGE_TASKS,
        items: [{
          _id: 0,
          title: 'Add account item',
          link: 'https://github.com/test'
        }]
      });
      return;
      axios.get('/api/tasks')
        .then(response => dispatch({
          type: types.MERGE_TASKS,
          items: response.data
        }))
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function archiveTask(taskId) {
  return async function(dispatch) {
    try {
      const {data: task} = await axios({
        method: 'POST',
        url: `/api/tasks/${taskId}/archive`,
      });
      dispatch({
        type: types.MERGE_TASKS,
        items: [task]
      });
    } catch(err) {
      console.error(err);
    }
  };
}
