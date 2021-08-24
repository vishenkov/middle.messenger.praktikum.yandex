import cn from '../../lib/classnames';
import * as styles from './link.css';

const Link = (modifiers) => `
  <a
    class="${cn(styles.root, {
    [styles['input_full-width']]: modifiers.fullWidth,
    [styles['input_gutter-bottom']]: modifiers.gutterBottom,
  })}"
  href="{{ href }}"
  >
    {{ text }}
  </a>
`;

export default Link;
