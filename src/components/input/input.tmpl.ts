import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import * as styles from './input.css';
import isObject from '../../lib/utils/is-object';

const Input = ({
  fullWidth = false,
  gutterBottom = false,
  formErrors = {},
  formValues = {},
  name = '',
}: Props) => {
  const hasError = isObject(formErrors) && Object.prototype.hasOwnProperty.call(formErrors, name);
  const classNames = cn(styles, 'input', {
    'input_full-width': fullWidth,
    'input_gutter-bottom': gutterBottom,
    input_error: hasError,
  });

  const value = isObject(formValues) && Object.prototype.hasOwnProperty.call(formValues, name)
    ? formValues[name] ?? ''
    : '';

  return `
    <div class="${fullWidth && styles['input_full-width']}">
      <input
        type={{type}}
        class="${classNames}"
        placeholder={{placeholder}}
        name={{name}}
        onBlur={{handleBlur}}
        onFocus={{onFocus}}
        value="${value}"
      />

      ${hasError
    ? ` <Typography
              gutterBottom="true"
              error="true"
            >
            ${formErrors[name]}
          </Typography>
          `
    : ''}
    </div>
  `;
};

export default Input;
