import store from '../store';
import actions from '../store/actions';
import isEmpty from '../lib/utils/is-empty';
import FormValidator from '../lib/services/form-validator';

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

export default function validate() {
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

      console.warn('errors:', errors);

      console.table(Object.entries(data));

      if (isEmpty(errors)) {
        originalValue.call(target, data);
      } else {
        store.dispatch({ type: actions.setFormErrors, payload: errors });
      }
    };
  };
}