import loginTmpl from './login.tmpl';

import Templator from '../../lib/templator';

import Paper from '../../components/paper';
import Button from '../../components/button';
import Input from '../../components/input';
import Container from '../../components/container';

const components = {
  Paper,
  Button,
  Input,
  Container,
};

const getLoginPage = () => {
  const templator = new Templator(loginTmpl(), components);

  return templator.compile({
    loginInput: {
      placeholder: 'Login',
    },
    button: {
      label: 'OK',
    },
  });
};

export default getLoginPage;
