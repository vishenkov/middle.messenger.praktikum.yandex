import BaseComponent from '../../lib/base-component';
import getRegistrationTmpl from './registration.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';

class Registration extends BaseComponent {
  constructor(props) {
    super(props, {
      Container,
      Link,
      Button,
      Input,
      Typography,
      Paper,
      Native,
    });
  }

  render() {
    return getRegistrationTmpl(this.props);
  }
}

export default Registration;
