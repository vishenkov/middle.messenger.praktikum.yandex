import BaseComponent from '../../lib/base-component';
import getAvatarTmpl from './avatar.tmpl';

import Native from '../native';

class Avatar extends BaseComponent {
  constructor(props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getAvatarTmpl(this.props);
  }
}

export default Avatar;
