import BaseComponent from '../../lib/base-component';
import getContainerTmpl from './container.tmpl';

class Container extends BaseComponent {
  render() {
    return getContainerTmpl(this.props);
  }
}

export default Container;
