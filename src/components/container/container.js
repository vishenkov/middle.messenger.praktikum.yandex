import cn from '../../lib/classnames';
import * as styles from './container.css';

export default (modifiers) => console.log('CONTAINER::modifiers', modifiers, cn(styles.root, {
  [styles.centered]: modifiers.centered,
})) || `
  <div class="${cn(styles.root, {
    [styles.centered]: modifiers.centered,
  })}">
    {{children}}
  </div>
`;
