import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import * as styles from './link.css';

const Link = (props: Props) => `
  <a
    class="${cn(styles, 'root', {
    'input_full-width': props.fullWidth,
    'input_gutter-bottom': props.gutterBottom,
  })} ${props.className}"
    href="${props.href}"
  >
    ${props.text}
  </a>
`;

export default Link;
