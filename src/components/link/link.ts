import BaseComponent from '../../lib/base-component';
import getLinkTmpl from './link.tmpl';

import Native from '../native';

class Link extends BaseComponent {
  constructor(props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getLinkTmpl(this.props);
  }
}

export default Link;
