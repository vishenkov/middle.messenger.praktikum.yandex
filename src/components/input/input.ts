import BaseComponent from '../../lib/base-component';
import getInputTmpl from './input.tmpl';

class Input extends BaseComponent {
  render() {
    return getInputTmpl(this.props);
  }
}

export default Input;
