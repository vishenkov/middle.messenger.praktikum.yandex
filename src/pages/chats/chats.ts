import BaseComponent from '../../lib/base-component';
import getChatsTmpl from './chats.tmpl';

import Container from '../../components/container';
import Button from '../../components/button';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';
import Input from '../../components/Input';

import { Props } from '../../lib/types';
import isEqual from '../../lib/utils/is-equal';
import FormValidator from '../../lib/services/form-validator';

class Chats extends BaseComponent {
  formValidator: FormValidator;

  constructor() {
    super({}, {
      Container,
      Button,
      Typography,
      Paper,
      Native,
      Avatar,
      Link,
      Input,
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
    return getChatsTmpl();
  }
}

export default Chats;
