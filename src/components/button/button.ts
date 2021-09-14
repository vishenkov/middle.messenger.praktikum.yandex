import BaseComponent, { Props } from '../../lib/base-component';
import getButtonTmpl from './button.tmpl';

import Native from '../native';

class Button extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getButtonTmpl(this.props);
  }
}

export default Button;
