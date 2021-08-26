import cn from '../../lib/classnames';
import * as styles from './container.css';

export default (modifiers) => `
  <main class="${cn(styles, 'root', {
    centered: modifiers.centered,
    min100vh: modifiers.min100vh,
  })}">
    {{children}}
  </main>
`;
