import registartionTemplate from './registration.tmpl';

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

const getRegistrationPage = () => {
  const templator = new Templator(registartionTemplate, components);

  return templator.compile({
    title: 'Регистрация',
    emailInput: {
      name: 'email',
      placeholder: 'Почта',
    },
    loginInput: {
      name: 'login',
      placeholder: 'Логин',
    },
    nameInput: {
      name: 'first_name',
      placeholder: 'Имя',
    },
    secondNameInput: {
      name: 'second_name',
      placeholder: 'Фамилия',
    },
    passwordInput: {
      name: 'password',
      placeholder: 'Пароль',
    },
    passwordRepeatInput: {
      name: 'repeat-password',
      placeholder: 'Повтор пароля',
    },
    phoneInput: {
      name: 'phone',
      placeholder: 'Телефон',
    },
    createAccButton: {
      label: 'Создать аккаунт',
    },
    loginLink: {
      text: 'Войти',
      href: '/',
    },
  });
};

export default getRegistrationPage;
