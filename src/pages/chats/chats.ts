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
import ListItem from '../../components/list-item';

import FormValidator from '../../lib/services/form-validator';
import userController from '../../controllers/user-controller';
import chatsController from '../../controllers/chats-controller';
import connect from '../../store/connect';
import { State } from '../../lib/store/types';
import { Event, Props } from '../../lib/types';
import { ChatsProps } from './types';

class Chats extends BaseComponent {
  formValidator: FormValidator;

  constructor(props: Props) {
    super(props, {
      Container,
      Button,
      Typography,
      Paper,
      Native,
      Avatar,
      Link,
      Input,
      ListItem,
    });

    this.formValidator = new FormValidator();
  }

  componentWillMount() {
    if (!this.props.user) {
      userController.load();
    }

    chatsController.loadAll();
  }

  handleLogoutClick(e: Event) {
    e.preventDefault();

    return userController.logout();
  }

  registerHandlers() {
    this.setHandlers({
      handleLogoutClick: this.handleLogoutClick.bind(this),
    });
  }

  render() {
    return getChatsTmpl(this.props as ChatsProps);
  }
}

export default connect((state: State) => ({
  user: state.user,
  chats: state.chats,
}))(Chats);
