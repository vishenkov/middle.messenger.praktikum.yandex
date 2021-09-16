import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import * as styles from './input.css';

const Input = (props: Props) => {
  const valueProp = props.value
    ? `value="${props.value}"`
    : '';

  const typeProp = props.type ?? 'text';

  const classNames = cn(styles, 'input', {
    'input_full-width': props.fullWidth,
    'input_gutter-bottom': props.gutterBottom,
    input_error: props.error,
  });

  return `
    <input
      type="${typeProp}"
      class="${classNames}"
      placeholder="${props.placeholder}"
      name="${props.name}"
      onBlur={{handleBlur}}
      ${valueProp}
    />
  `;
};

export default Input;
