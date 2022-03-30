import { toArray } from "../utils/normalize";

export const selectUsers = (state) => toArray(state.users);

export const selectKits = (state) => toArray(state.kits);

export const selectOrganizations = (state) => toArray(state.organizations);

export const selectActiveUser = (state) => state.auth.user;

export const stateToArray = (state, key) => toArray(state[key]);
