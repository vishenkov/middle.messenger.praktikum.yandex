import BaseComponent from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

import Native from '../native';

class Input extends BaseComponent {
  constructor(props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getInputTmpl(this.props);
  }
}

export default Input;
