import cn from '../../lib/classnames';
import * as styles from './container.css';

export default (props) => `
  <main class="${cn(styles, 'root', {
    centered: props.centered,
    min100vh: props.min100vh,
  })}">
    {{children}}
  </main>
`;
