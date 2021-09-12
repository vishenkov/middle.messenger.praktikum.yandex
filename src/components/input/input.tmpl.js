import cn from '../../lib/classnames';
import * as styles from './input.css';

const Input = (props) => console.log('props', props) || `
  <input
    type="text"
    class="${cn(styles, 'input', {
    'input_full-width': props.fullWidth,
    'input_gutter-bottom': props.gutterBottom,
  })}"
    placeholder="${props.placeholder}"
    name="${props.name}"
  />
`;

export default Input;
