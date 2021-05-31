import { toArray } from '../utils/normalize';

export const selectUsers = state => toArray(state.users);

export const selectTasks = state => toArray(state.tasks);

export const selectActiveUser = state => state.auth.user;

export const selectLastSearch = state => {
  if (state.searches.allIds.length == 0) return null;
  return state.searches.byId[state.searches.allIds[state.searches.allIds.length - 1]];
};
