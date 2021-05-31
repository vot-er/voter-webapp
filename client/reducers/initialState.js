import {initializeNormalState} from '../utils/normalize';

export default {
  auth: {
    isAuthenticating: false,
    user: null,
    activeAccountId: null
  },
  users: initializeNormalState(),
  kits: initializeNormalState()
};
