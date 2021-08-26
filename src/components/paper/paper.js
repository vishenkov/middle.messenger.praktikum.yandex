import cn from '../../lib/classnames';
import * as styles from './paper.css';

export default (modifiers) => `
  <div class="${cn(styles, 'root', {
    centered: modifiers.centered,
  })}">
    {{children}}
  </div>
`;
