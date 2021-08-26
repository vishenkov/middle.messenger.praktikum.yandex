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

const getContext = (code) => {
  switch (code) {
    case 404: {
      return {
        title: '404',
        subtitle: 'Не туда попали',
        backButton: {
          label: 'Назад к чатам',
        },
      };
    }

    case 500: {
      return {
        title: '500',
        subtitle: 'Уже чиним :(',
        backButton: {
          label: 'Назад к чатам',
        },
      };
    }

    default:
      throw new Error(`code ${code} is not supported`);
  }
};

const getErrorPage = (code = 404) => {
  const templator = new Templator(errorTemplate, components);

  return templator.compile(getContext(code));
};

export default getErrorPage;
