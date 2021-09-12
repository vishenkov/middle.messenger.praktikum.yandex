import BaseComponent from '../../lib/base-component';
import getTypographyTmpl from './typography.tmpl';

class Typography extends BaseComponent {
  render() {
    return getTypographyTmpl(this.props);
  }
}

export default Typography;
