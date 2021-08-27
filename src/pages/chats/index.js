import chatsTemplate from './chats.tmpl';

import Templator from '../../lib/templator';

import Paper from '../../components/paper';
import Button from '../../components/button';
import Container from '../../components/container';
import Typography from '../../components/typography';

const components = {
  Paper,
  Button,
  Container,
  Typography,
};

const getChatsPage = () => {
  const templator = new Templator(chatsTemplate, components);

  return templator.compile({
    title: 'WORK IN PROGRESS',
    subtitle: 'Скоро здесь будут чаты',
    backButton: {
      label: 'Назад',
    },
  });
};

export default getChatsPage;
