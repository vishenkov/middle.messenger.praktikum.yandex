import BaseComponent from '../../lib/base-component';
import getLoginTmpl from './login.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';

class Login extends BaseComponent {
  constructor(props) {
    super(props, {
      Container,
      Link,
      Button,
      Input,
      Typography,
      Paper,
    });
  }

  render() {
    return getLoginTmpl(this.props);
  }
}

export default Login;
