import BaseComponent from '../../lib/base-component';
import getLinkTmpl from './link.tmpl';

class Link extends BaseComponent {
  render() {
    return getLinkTmpl(this.props);
  }
}

export default Link;
