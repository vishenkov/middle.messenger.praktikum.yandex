import * as styles from './input.css';

const Input = () => `
  <div>
    <input type="text" class="${styles.root}" placeholder="{{ placeholder }}" />
  </div>
`;

export default Input;
