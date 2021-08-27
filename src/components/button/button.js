import cn from '../../lib/classnames';
import * as styles from './button.css';

const Button = (modifiers) => `
  <button class="${cn(styles, 'button', {
    'button_full-width': modifiers.fullWidth,
    'button_gutter-bottom': modifiers.gutterBottom,
    button_primary: !modifiers.secondary,
    button_secondary: modifiers.secondary,
  })}">
    <span class="${styles.button__text}">{{ label }}</span>
  </button>
`;

export default Button;
