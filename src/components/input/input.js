// import classnames from '../../lib/classnames';
import * as styles from './input.css';

const Input = (ctx) => `
  <div>
    <input type="text" class="${styles.root}" placeholder="${ctx.placeholder}" />
    <Button ctx="{{${ctx.buttonCtxLabel}}}" />
  </div>
`;

export default Input;
