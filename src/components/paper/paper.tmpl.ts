import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import styles from './paper.css';

export default (props: Props) => `
  <div class="${cn(styles, 'root', {
    centered: props.centered,
  })}">
    {{children}}
  </div>
`;
