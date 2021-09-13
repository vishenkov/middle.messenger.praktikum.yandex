import BaseComponent from '../../lib/base-component';
import getTypographyTmpl from './typography.tmpl';

import Native from '../native';

class Typography extends BaseComponent {
  constructor(props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getTypographyTmpl(this.props);
  }
}

export default Typography;
