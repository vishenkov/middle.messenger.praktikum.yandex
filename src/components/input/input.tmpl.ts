import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import * as styles from './input.css';

const Input = (props: Props) => `
  <input
    type="text"
    class="${cn(styles, 'input', {
    'input_full-width': props.fullWidth,
    'input_gutter-bottom': props.gutterBottom,
    input_error: props.error,
  })}"
    placeholder="${props.placeholder}"
    name="${props.name}"
  />
`;

export default Input;
