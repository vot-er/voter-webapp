import {initializeNormalState} from '../utils/normalize';

export default {
  auth: {
    isAuthenticating: false,
    user: null,
    activeAccountId: null
  },
  alert: {
    err: null
  },
  users: initializeNormalState(),
  kits: initializeNormalState(),
  organizations: initializeNormalState()
};
