import BaseComponent from '../../lib/base-component';
import getLoginTmpl from './login.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Alert from '../../components/alert';

import { Props } from '../../lib/types';
import userController from '../../controllers/user-controller';
import connect from '../../store/connect';
import { State } from '../../lib/store/types';
import { Login as LoginProps } from '../../api/types';

class Login extends BaseComponent {
  constructor(props: Props) {
    super(props, {
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

    userController.login(formProps as LoginProps);
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
    });
  }

  render() {
    return getLoginTmpl();
  }
}

export default connect((state: State) => ({
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
}))(Login);
