import BaseComponent, { Props } from '../../lib/base-component';
import getContainerTmpl from './container.tmpl';

import Native from '../native';

class Container extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getContainerTmpl(this.props);
  }
}

export default Container;
