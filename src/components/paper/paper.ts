import BaseComponent, { Props } from '../../lib/base-component';
import getPaperTmpl from './paper.tmpl';

import Native from '../native';

class Paper extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getPaperTmpl(this.props);
  }
}

export default Paper;
