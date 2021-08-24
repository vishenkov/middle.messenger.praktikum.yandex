import loginTemplate from './login.tmpl';

import Templator from '../../lib/templator';

import Paper from '../../components/paper';
import Button from '../../components/button';
import Input from '../../components/input';
import Container from '../../components/container';
import Typography from '../../components/typography';
import Link from '../../components/link';

const components = {
  Paper,
  Button,
  Input,
  Container,
  Typography,
  Link,
};

const getLoginPage = () => {
  const templator = new Templator(loginTemplate, components);

  return templator.compile({
    title: 'Вход',
    loginInput: {
      name: 'login',
      placeholder: 'Логин',
    },
    passwordInput: {
      name: 'password',
      placeholder: 'Пароль',
    },
    loginButton: {
      label: 'Войти',
    },
    createAccLink: {
      text: 'Создать аккаунт',
      href: '/registration',
    },
  });
};

export default getLoginPage;
