import loginApi from '../api/login-api';
import logoutApi from '../api/logout-api';
import registrationApi from '../api/registration-api';
import authApi from '../api/auth-api';
import userApi from '../api/user-api';
import avatarApi from '../api/avatar-api';
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

    case 'first_name':
    case 'second_name':
      return 'Может содержать латиницу и цифры, без пробелов';

    case 'phone':
      return 'Должке содержать цифры';

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
        return await originalValue.apply(target, args);
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

function validate() {
  return function decorator(target, propertyName, descriptor) {
    const originalValue = descriptor.value;
    descriptor.value = async (data) => {
      store.dispatch({ type: actions.setFormValues, payload: data });

      const formValidator = new FormValidator();
      const errors = Object.entries(data).reduce((acc, [key, value]) => {
        if (formValidator.supports(key)) {
          const isValid = formValidator.prop(key).validate(value as string);
          console.log('key', key, 'value', value, 'isValid', isValid);
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
        return originalValue.call(target, data);
      }
      store.dispatch({ type: actions.setFormErrors, payload: errors });
    };
  };
}

class UserController {
  @validate()
  @handleError()
  async login(data) {
    await loginApi.create(data);
    (new Router()).go('/');
  }

  @handleError()
  async logout() {
    logoutApi.create();
    (new Router()).go('/login');
  }

  @validate()
  @handleError()
  async registration(data) {
    if (data.password !== data.repeat_password) {
      store.dispatch({
        type: actions.setFormErrors,
        payload: {
          password: '',
          repeat_password: 'Пароль не совпадает',
        },
      });
      return;
    }

    await registrationApi.create({ data });
  }

  @handleError()
  async load() {
    const user = await authApi.read();
    store.dispatch({ type: actions.setUser, payload: user });
    store.dispatch({ type: actions.setFormValues, payload: user });
  }

  @validate()
  @handleError()
  async updateProfile(data) {
    const { user } = store.getState();
    const updatedUser = await userApi.changeProfile({ ...data, login: user.login });
    store.dispatch({ type: actions.setUser, payload: updatedUser });
  }

  @validate()
  @handleError()
  async updatePassword(data) {
    await userApi.changePassword(data);
  }

  @validate()
  @handleError()
  async updateAvatar(data) {
    await avatarApi.put(data);
  }

  @validate()
  @handleError()
  async search(data) {
    const results = await userApi.search(data);

    return results;
  }
}

export default new UserController();
