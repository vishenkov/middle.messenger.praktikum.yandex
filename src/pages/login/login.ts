import BaseComponent from '../../lib/base-component';
import getLoginTmpl from './login.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Button from '../../components/button';
import Input from '../../components/input';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';

class Login extends BaseComponent {
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

  handleLoginChange(e) {
    console.log(e.target.value);
  }

  handleClick() {
    console.log('CLICK');
  }

  registerHandlers() {
    this.setHandlers({
      handleLoginChange: this.handleLoginChange.bind(this),
      handleClick: this.handleClick.bind(this),
    });
  }

  render() {
    return getLoginTmpl();
  }
}

export default Login;