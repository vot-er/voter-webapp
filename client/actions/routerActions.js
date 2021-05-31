import {history} from '../store/configureStore';

export function goTo(params, options = {}) {
  return function() {
    history.push(params);
    if (options.forceRefresh) history.go(0);
  };
}

export function replace(pathname) {
  return function() {
    history.replace(pathname);
  };
}

export function goBack(pathname) {
  return function() {
    history.goBack(pathname);
  };
}
