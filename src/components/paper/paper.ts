import BaseComponent from '../../lib/base-component';
import getPaperTmpl from './paper.tmpl';

class Paper extends BaseComponent {
  render() {
    return getPaperTmpl(this.props);
  }
}

export default Paper;
