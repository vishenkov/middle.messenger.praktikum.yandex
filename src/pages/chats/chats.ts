import BaseComponent from '../../lib/base-component';
import getChatsTmpl from './chats.tmpl';

import Container from '../../components/container';
import Button from '../../components/button';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Avatar from '../../components/avatar';
import Link from '../../components/link';
import Input from '../../components/input';

import { Props } from '../../lib/types';
import isEqual from '../../lib/utils/is-equal';
import FormValidator from '../../lib/services/form-validator';
import userController from '../../controllers/user-controller';
import chatsController from '../../controllers/chats-controller';
import connect from '../../store/connect';
import { State } from '../../lib/store/types';

class Chats extends BaseComponent {
  formValidator: FormValidator;

  constructor(props) {
    super(props, {
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

  componentWillMount() {
    if (!this.props.user) {
      userController.load();
    }

    chatsController.loadAll();
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

  handleLogoutClick(e) {
    e.preventDefault();

    return userController.logout();
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
      handleLogoutClick: this.handleLogoutClick.bind(this),
    });
  }

  render() {
    console.log('RENDER', this.props.user);
    return getChatsTmpl(this.props);
  }
}

export default connect((state: State) => console.log('connect::state', state) || ({
  user: state.user,
  chats: state.chats,
}))(Chats);
