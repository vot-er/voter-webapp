import api from 'api';

import config from "../config/environment";

export const everyActionApi = api('@everyaction/v1.0#2n6lmckwp78ce7').auth(
  config.everyAction.appName,
  config.everyAction.apiKey
)
