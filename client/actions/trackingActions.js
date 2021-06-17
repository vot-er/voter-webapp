import mixpanel from 'mixpanel-browser';

export function trackEvent(type) {
  return async function() {
    try {
      mixpanel.track(type);
    } catch(err) {
      console.error(err);
    }
  };
}

export function identifyUser(userId, user) {
  return async function() {
    try {
      mixpanel.identify(userId);
      if (user) {
        const userProps = {
          $last_login: new Date() // eslint-disable-line camelcase
        };
        if (user.email) {
          userProps.$email = user.email;
        }
        if (user.name) {
          userProps.$name = user.name;
        }
        if (user.stateOfWork) {
          userProps.state_of_work = user.stateOfWork; // eslint-disable-line camelcase
        }
        mixpanel.people.set(userProps);
      }
    } catch(err) {
      console.error(err);
    }
  };
}
