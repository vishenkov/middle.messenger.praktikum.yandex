import cn from '../../lib/classnames';
import * as styles from './button.css';

const Button = (modifiers) => `
  <button class="${cn(styles.button, {
    [styles['button_full-width']]: modifiers.fullWidth,
    [styles['button_gutter-bottom']]: modifiers.gutterBottom,
    [styles.button_primary]: !modifiers.secondary,
    [styles.button_secondary]: modifiers.secondary,
  })}">
    <span class="${styles.button__text}">{{ label }}</span>
  </button>
`;

export default Button;
