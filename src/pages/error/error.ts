import BaseComponent from '../../lib/base-component';
import getErrorTmpl from './error.tmpl';

import Container from '../../components/container';
import Button from '../../components/button';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';

class Error extends BaseComponent {
  constructor(props) {
    super(props, {
      Container,
      Button,
      Typography,
      Paper,
      Native,
    });
  }

  render() {
    return getErrorTmpl(this.props);
  }
}

export default Error;
