import loginApi from '../api/login-api';
import logoutApi from '../api/logout-api';
import registrationApi from '../api/registration-api';
import userApi from '../api/user-api';
import FormValidator from '../lib/services/form-validator';
import Router from '../lib/router/router';
import store from '../store';
import actions from '../store/actions';
import isEmpty from '../lib/utils/is-empty';

function getError(key: string) {
  switch (key) {
    case 'login':
      return 'Может содержать латиницу и цифры, без пробелов';

    case 'email':
      return 'Должен содержать @ и точку в конце';

    case 'password':
      return 'Должен быть от 8 до 40 символов, и иметь хотя бы 1 заглавную';

    default:
      throw new Error(`Unknown error for key: ${key}`);
  }
}

function handleError() {
  return function decorator(target, propertyName, descriptor) {
    const originalValue = descriptor.value;
    descriptor.value = async (...args: any) => {
      try {
        store.dispatch({ type: actions.clearRequestError });
        await originalValue.apply(target, args);
      } catch (error) {
        console.error(error);
        store.dispatch({ type: actions.setRequestError, payload: error.reason });
      }
    };
  };
}

function validate() {
  return function decorator(target, propertyName, descriptor) {
    const originalValue = descriptor.value;
    descriptor.value = async (data) => {
      store.dispatch({ type: actions.setFormValues, payload: data });

      const formValidator = new FormValidator();
      const errors = Object.entries(data).reduce((acc, [key, value]) => {
        if (formValidator.supports(key)) {
          const isValid = formValidator.prop(key).validate(value as string);
          if (!isValid) {
            acc[key] = getError(key);
          }
        }

        return acc;
      }, {});

      console.warn('errors:', errors);

      console.table(Object.entries(data));

      console.log('data', data);

      if (isEmpty(errors)) {
        originalValue.call(target, data);
      } else {
        store.dispatch({ type: actions.setFormErrors, payload: errors });
      }

      console.log('store', store.getState());
    };
  };
}

class UserController {
  @validate()
  @handleError()
  async login(data) {
    const userId = await loginApi.create(data);
    console.log('userId', userId);
  }

  @handleError()
  async logout() {
    logoutApi.create();
    (new Router()).go('/login');
  }

  @validate()
  @handleError()
  async registration(data) {
    const userId = await registrationApi.create({ data });
    console.log('userId', userId);
  }

  @handleError()
  async load() {
    const user = await userApi.read();
    console.log('user', user);
    store.dispatch({ type: actions.setUser, payload: user });
  }
}

export default new UserController();
