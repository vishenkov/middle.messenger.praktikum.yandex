import loginTemplate from './profile.tmpl';

import Templator from '../../lib/templator';

import Paper from '../../components/paper';
import Button from '../../components/button';
import Input from '../../components/input';
import Container from '../../components/container';
import Typography from '../../components/typography';
import Link from '../../components/link';
import Avatar from '../../components/avatar/avatar';

const components = {
  Paper,
  Button,
  Input,
  Container,
  Typography,
  Link,
  Avatar,
};

const getLoginPage = () => {
  const templator = new Templator(loginTemplate, components);

  return templator.compile({
    fullName: 'John Doe',
    emailInput: {
      name: 'email',
      placeholder: 'Почта',
    },
    nameInput: {
      name: 'first_name',
      placeholder: 'Имя',
    },
    secondNameInput: {
      name: 'second_name',
      placeholder: 'Фамилия',
    },
    nickNameInput: {
      name: 'nick_name',
      placeholder: 'Имя в чате',
    },
    phoneInput: {
      name: 'phone',
      placeholder: 'Телефон',
    },
    saveButton: {
      label: 'Сохранить',
    },
    changePasswordButton: {
      label: 'Сменить пароль',
    },
    backLink: {
      text: 'Назад',
      href: '/',
    },
  });
};

export default getLoginPage;
