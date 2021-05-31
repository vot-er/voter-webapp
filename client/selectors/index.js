import { toArray } from '../utils/normalize';

export const selectUsers = state => toArray(state.users);

export const selectKits = state => toArray(state.kits);

export const selectActiveUser = state => state.auth.user;
