import BaseComponent from '../../lib/base-component';
import getChatsTmpl from './chats.tmpl';

import Container from '../../components/container';
import Button from '../../components/button';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';

class Chats extends BaseComponent {
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
    return getChatsTmpl(this.props);
  }
}

export default Chats;
