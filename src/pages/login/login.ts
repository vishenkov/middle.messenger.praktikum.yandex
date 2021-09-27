import BaseComponent from '../../lib/base-component';
import getLoginTmpl from './login.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import isEqual from '../../lib/utils/is-equal';

import { Props } from '../../lib/types';
import FormValidator from '../../lib/services/form-validator';

class Login extends BaseComponent {
  formValidator: FormValidator;

  constructor() {
    super({}, {
      Container,
      Link,
      Button,
      Input,
      Typography,
      Paper,
      Native,
    });

    this.formValidator = new FormValidator();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    const hasError = Object.entries(formProps).some(([key, value]) => {
      if (this.formValidator.supports(key)) {
        const isValid = this.formValidator.prop(key).validate(value as string);
        return !isValid;
      }

      return false;
    });

    console.warn('Has errors:', hasError);

    console.table(Object.entries(formProps));
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

export default Login;
