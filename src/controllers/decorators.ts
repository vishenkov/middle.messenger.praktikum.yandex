import store from '../store';
import actions from '../store/actions';
import Router from '../lib/router/router';

import isEmpty from '../lib/utils/is-empty';
import FormValidator from '../lib/services/form-validator';

export function handleError() {
  return function decorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async (...args: any) => {
      try {
        store.dispatch({ type: actions.clearRequestError });
        const result = await originalValue.apply(target, args);
        return result;
      } catch (error) {
        if (error.code === 401) {
          store.dispatch({ type: actions.setRequestError, payload: error.reason });
          (new Router()).go('/login');
          return;
        }
        if (error.code === 404) {
          (new Router()).go('/404');
          return;
        }

        if (error.code >= 400) {
          store.dispatch({ type: actions.setRequestError, payload: error.reason });
          return;
        }

        (new Router()).go('/500');
      }
    };
  };
}

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
      console.warn(`key ${key} is not supported for validation!`);
      return 'Неверное значение';
  }
}

export function validate() {
  return function decorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const originalValue = descriptor.value;
    // eslint-disable-next-line no-param-reassign
    descriptor.value = async (data: Record<string, unknown>) => {
      store.dispatch({ type: actions.setFormValues, payload: data });

      const formValidator = new FormValidator();
      const errors = Object.entries(data).reduce((acc: Record<string, unknown>, [key, value]) => {
        if (formValidator.supports(key)) {
          const isValid = formValidator.prop(key).validate(value as string);
          if (!isValid) {
            acc[key] = getError(key);
          }
        }

        return acc;
      }, {});

      if (isEmpty(errors)) {
        return originalValue.call(target, data);
      }

      store.dispatch({ type: actions.setFormErrors, payload: errors });
    };
  };
}
