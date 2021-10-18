import BaseComponent from '../../lib/base-component';
import getProfileTmpl from './profile.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';
import Alert from '../../components/alert';

import { State } from '../../lib/store/types';
import connect from '../../store/connect';
import userController from '../../controllers/user-controller';

class Profile extends BaseComponent {
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
    const formProps = Object.fromEntries(formData);

    console.table(Object.entries(formProps));
    userController.updateProfile(formProps);
  }

  registerHandlers() {
    this.setHandlers({
      handleSubmit: this.handleSubmit.bind(this),
    });
  }

  render() {
    return getProfileTmpl(this.props);
  }
}

export default connect((state: State) => ({
  user: state.user,
  formErrors: state.formErrors,
  formValues: state.formValues,
  requestError: state.requestError,
}))(Profile);
