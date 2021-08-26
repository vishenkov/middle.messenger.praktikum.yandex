import cn from '../../lib/classnames';
import * as styles from './input.css';

const Input = (modifiers) => `
  <input
    type="text"
    class="${cn(styles, 'input', {
    'input_full-width': modifiers.fullWidth,
    'input_gutter-bottom': modifiers.gutterBottom,
  })}"
    placeholder="{{ placeholder }}"
    name="{{ name }}"
  />
`;

export default Input;
