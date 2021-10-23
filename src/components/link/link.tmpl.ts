import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import styles from './link.css';

const Link = (props: Props) => `
  <a
    class="${cn(styles, 'root', {
    'input_full-width': props.fullWidth,
    'input_gutter-bottom': props.gutterBottom,
  })} ${props.className}"
    href="${props.href}"
    onClick={{onClick}}
  >
    ${props.text}
  </a>
`;

export default Link;
