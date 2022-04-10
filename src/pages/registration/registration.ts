import BaseComponent from '../../lib/base-component';
import getRegistrationTmpl from './registration.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Alert from '../../components/alert';

import { State } from '../../lib/store/types';
import userController from '../../controllers/user-controller';
import connect from '../../store/connect';
import store from '../../store';
import actions from '../../store/actions';
import { Registration as RegistrationType } from '../../api/types';

class Registration extends BaseComponent {
  constructor() {
    super({}, {
      Container,
      Link,
      Button,
      Input,
      Typography,
      Paper,
      Native,
      Alert,
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    if (formProps.password !== formProps.repeat_password) {
      store.dispatch({
        type: actions.setFormErrors,
        payload: {
          password: '',
          repeat_password: 'Пароль не совпадает',
        },
      });
      return;
    }

    userController.registration(formProps as unknown as RegistrationType);
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
    });
  }

  render() {
    return getRegistrationTmpl();
  }
}

export default connect((state: State) => ({
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
}))(Registration);
