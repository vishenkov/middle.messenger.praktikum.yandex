import errorTemplate from './error.tmpl';

import Templator from '../../lib/templator';

import Paper from '../../components/paper';
import Button from '../../components/button';
import Input from '../../components/input';
import Container from '../../components/container';
import Typography from '../../components/typography';

const components = {
  Paper,
  Button,
  Input,
  Container,
  Typography,
};

const getErrorPage = () => {
  const templator = new Templator(errorTemplate, components);

  return templator.compile({
    title: '404',
    subtitle: 'Не туда попали',
    backButton: {
      label: 'Назад к чатам',
    },
  });
};

export default getErrorPage;
