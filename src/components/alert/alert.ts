import BaseComponent, { Props } from '../../lib/base-component';
import getAlertTmpl from './alert.tmpl';

import Native from '../native';
import Typography from '../typography';

class Avatar extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
      Typography,
    });
  }

  render() {
    return getAlertTmpl(this.props);
  }
}

export default Avatar;
