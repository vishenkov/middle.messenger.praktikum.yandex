import BaseComponent from '../../lib/base-component';
import getNewUserTmpl from './users.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Alert from '../../components/alert';
import ListItem from '../../components/list-item';

import { State } from '../../lib/store/types';
import connect from '../../store/connect';
import userController from '../../controllers/user-controller';
import chatsController from '../../controllers/chats-controller';
import { UsersProps } from './types';
import { User } from '../../api/types';

class NewUser extends BaseComponent {
  constructor(props: UsersProps) {
    super({
      users: [],
      ...props,
    }, {
      Container,
      Link,
      Avatar,
      Button,
      Input,
      Typography,
      Paper,
      Native,
      Alert,
      ListItem,
    });
  }

  componentWillMount() {
    chatsController.loadChat(this.props.id as number);
  }

  async handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    const users = await userController.search(formProps);

    this.setProps({
      users,
    });
  }

  async handleUserClick(user: User) {
    return chatsController.addUser(this.props.id as number, user.id);
  }

  async handleDeleteUserClick(user: User) {
    return chatsController.removeUser(this.props.id as number, user.id);
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
      handleUserClick: this.handleUserClick.bind(this),
      handleDeleteUserClick: this.handleDeleteUserClick.bind(this),
    });
  }

  render() {
    return getNewUserTmpl(this.props as UsersProps);
  }
}

export default connect((state: State) => ({
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
  chatUsers: state.chatUsers,
}))(NewUser);
