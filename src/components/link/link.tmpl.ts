import cn from '../../lib/classnames';
import * as styles from './link.css';

const Link = (props) => `
  <a
    class="${cn(styles, 'root', {
    'input_full-width': props.fullWidth,
    'input_gutter-bottom': props.gutterBottom,
  })}"
    href="${props.href}"
  >
    ${props.text}
  </a>
`;

export default Link;
