'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DATABASE_URL: 'postgres://localhost:5432/dev',
  DOMAIN: 'http://localhost:3000',
  DEPLOYMENT_NAME: 'development',
  SESSION_SECRET: 'dev-secret',
  FORCE_HTTPS: 'false', // default true

  SENTRY_DSN_FRONTEND: null,
  SENTRY_DSN_BACKEND: null,

  SYSTEM_EMAIL_ADDRESS: 'noreply@domain.com',
  SYSTEM_EMAIL_NAME: 'No Reply',

  // Add token for Postmark Account here
  POSTMARK_TOKEN: '',

  NOTIFICATIONS_EMAIL: 'info@vot-er.org',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',

};
