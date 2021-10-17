import store from '../store';
import actions from '../store/actions';
import Router from '../lib/router/router';

export default function handleError() {
  return function decorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async (...args: any) => {
      try {
        store.dispatch({ type: actions.clearRequestError });
        return originalValue.apply(target, args);
      } catch (error) {
        if (error.code === 401) {
          (new Router()).go('/login');
        } else {
          store.dispatch({ type: actions.setRequestError, payload: error.reason });
        }
      }
    };
  };
}
