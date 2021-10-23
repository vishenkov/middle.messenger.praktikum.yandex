import BaseComponent, { Props } from '../../lib/base-component';
import getErrorTmpl from './error.tmpl';

import Container from '../../components/container';
import Link from '../../components/link';
import Typography from '../../components/typography';
import Paper from '../../components/paper';
import Native from '../../components/native';

class Error extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Container,
      Link,
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
