import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import * as styles from './input.css';

const Input = ({
  value = '',
  type = 'text',
  name,
  placeholder,
  fullWidth = false,
  gutterBottom = false,
  error = false,
}: Props) => {
  const classNames = cn(styles, 'input', {
    'input_full-width': fullWidth,
    'input_gutter-bottom': gutterBottom,
    input_error: error,
  });

  return `
    <input
      type="${type}"
      class="${classNames}"
      placeholder="${placeholder}"
      name="${name}"
      onBlur={{handleBlur}}
      onFocus={{handleFocus}}
      value="${value}"
    />
  `;
};

export default Input;
