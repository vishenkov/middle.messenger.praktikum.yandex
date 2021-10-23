import BaseComponent, { Props } from '../../lib/base-component';
import getTypographyTmpl from './typography.tmpl';
import { TypographyProps } from './types';

import Native from '../native';

class Typography extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
    });
  }

  render() {
    return getTypographyTmpl(this.props as TypographyProps);
  }
}

export default Typography;
