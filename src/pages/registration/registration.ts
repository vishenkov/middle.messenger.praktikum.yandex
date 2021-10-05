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

import { Props } from '../../lib/types';
import { State } from '../../lib/store/types';
import isEqual from '../../lib/utils/is-equal';
import userController from '../../controllers/user-controller';
import connect from '../../store/connect';

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

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    userController.registration(formProps);
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
