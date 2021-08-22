import * as styles from './button.css';

const Button = (ctx) => `
  <button class="${styles.button}">${ctx.label}</button>
`;

export default Button;
