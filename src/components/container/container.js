import cn from '../../lib/classnames';
import * as styles from './container.css';

export default (modifiers) => `
  <div class="${cn(styles.root, {
    [styles.centered]: modifiers.centered,
  })}">
    {{children}}
  </div>
`;
