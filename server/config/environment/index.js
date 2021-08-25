'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';
import shared from './shared';

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
var all = {
  appName: process.env.APP_NAME,
  domain: process.env.DOMAIN,
  env: process.env.NODE_ENV,
  deployment: process.env.DEPLOYMENT_NAME,
  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Postmark Token
  token: process.env.POSTMARK_TOKEN,

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,
  secrets: {
    session: process.env.SESSION_SECRET
  },
  mixpanel: {
    id: process.env.MIXPANEL_ID
  },
  sentry: {
    frontendDSN: process.env.SENTRY_DSN_FRONTEND,
    backendDSN: process.env.SENTRY_DSN_BACKEND
  },
  ...shared
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}-env.js`) || {});
