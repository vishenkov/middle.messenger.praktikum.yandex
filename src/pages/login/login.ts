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
import isEqual from '../../lib/utils/is-equal';

import { Props } from '../../lib/types';
import userController from '../../controllers/user-controller';
import connect from '../../store/connect';
import { State } from '../../lib/store/types';

class Login extends BaseComponent {
  constructor(props: Props) {
    super({
      ...props,
      hasError: false,
    }, {
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

    userController.login(formProps);
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
  user: state.user,
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
}))(Login);
