import * as styles from './button.css';

const Button = () => `
  <button class="${styles.button}">
    <span class="${styles.button__text}">{{ label }}</span>
  </button>
`;

export default Button;
