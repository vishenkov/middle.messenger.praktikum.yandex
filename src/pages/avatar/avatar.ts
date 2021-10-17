import BaseComponent from '../../lib/base-component';
import getAvatarTmpl from './avatar.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Alert from '../../components/Alert';

import { State } from '../../lib/store/types';
import connect from '../../store/connect';
import userController from '../../controllers/user-controller';

class AvatarPage extends BaseComponent {
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

  componentWillMount() {
    if (!this.props.user) {
      userController.load();
    }
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    userController.updateAvatar(formData);
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
    });
  }

  render() {
    return getAvatarTmpl();
  }
}

export default connect((state: State) => ({
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
}))(AvatarPage);
