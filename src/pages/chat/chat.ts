import BaseComponent from '../../lib/base-component';
import getChatTmpl from './chat.tmpl';

import Container from '../../components/container';
import Button from '../../components/button';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Avatar from '../../components/avatar';
import Link from '../../components/link';
import Input from '../../components/input';
import ListItem from '../../components/list-item';
import Messages from '../../components/messages';

import { Props } from '../../lib/types';
import isEqual from '../../lib/utils/is-equal';
import userController from '../../controllers/user-controller';
import chatsController from '../../controllers/chats-controller';
import connect from '../../store/connect';
import { State } from '../../lib/store/types';
import messagesController from '../../controllers/messages-controller';

class Chat extends BaseComponent {
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
      ListItem,
      Messages,
    });
  }

  componentWillMount() {
    chatsController.loadChat(this.props.id)
      .then(() => {
        messagesController.init(this.props.id);
      });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return !isEqual(oldProps, newProps);
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    console.table(Object.entries(formProps));
    messagesController.sendMessage(formProps.message);
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
    console.log('chat:props', { ...this.props });
    return getChatTmpl(this.props);
  }
}

export default connect((state: State) => ({
  user: state.user,
  chats: state.chats,
  tokens: state.tokens,
  messages: state.messages,
}))(Chat);
