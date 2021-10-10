import BaseComponent from '../../lib/base-component';
import getNewChatTmpl from './new-chat.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Alert from '../../components/Alert';

import { Props } from '../../lib/types';
import { State } from '../../lib/store/types';
import isEqual from '../../lib/utils/is-equal';
import connect from '../../store/connect';
import chatsController from '../../controllers/chats-controller';

class NewChat extends BaseComponent {
  constructor(props) {
    super(props, {
      Container,
      Link,
      Avatar,
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

    console.table(Object.entries(formProps));
    chatsController.createChat(formProps);
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
    });
  }

  render() {
    return getNewChatTmpl();
  }
}

export default connect((state: State) => ({
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
}))(NewChat);
