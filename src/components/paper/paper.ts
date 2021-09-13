import BaseComponent from '../../lib/base-component';
import getPaperTmpl from './paper.tmpl';

import Native from '../native';

class Paper extends BaseComponent {
  constructor(props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getPaperTmpl(this.props);
  }
}

export default Paper;
