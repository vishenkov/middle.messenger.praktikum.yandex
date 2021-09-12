import cn from '../../lib/classnames';
import * as styles from './paper.css';

export default (props) => `
  <div class="${cn(styles, 'root', {
    centered: props.centered,
  })}">
    {{children}}
  </div>
`;
