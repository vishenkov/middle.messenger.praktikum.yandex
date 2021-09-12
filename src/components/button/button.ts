import BaseComponent from '../../lib/base-component';
import getButtonTmpl from './button.tmpl';

class Button extends BaseComponent {
  render() {
    return getButtonTmpl(this.props);
  }
}

export default Button;
