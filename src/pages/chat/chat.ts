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
import userController from '../../controllers/user-controller';
import chatsController from '../../controllers/chats-controller';
import connect from '../../store/connect';
import { State } from '../../lib/store/types';
import messagesController from '../../controllers/messages-controller';
import { ChatProps } from './types';
import { Event } from '../../lib/types';

class Chat extends BaseComponent {
  constructor(props: ChatProps) {
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
    chatsController.loadChat(this.props.id as number)
      .then(() => {
        messagesController.init(this.props.id as number);
      });
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as unknown as HTMLFormElement);
    const formProps = Object.fromEntries(formData);

    messagesController.sendMessage(formProps.message as string);
  }

  handleLogoutClick(e: Event) {
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
    return getChatTmpl(this.props as ChatProps);
  }
}

export default connect((state: State) => ({
  user: state.user,
  chats: state.chats,
  tokens: state.tokens,
  messages: state.messages,
}))(Chat);
