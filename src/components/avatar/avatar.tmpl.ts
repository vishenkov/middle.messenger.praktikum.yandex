import cn from '../../lib/classnames';
import * as styles from './avatar.css';

const getAvatarTmpl = (props) => `
  <div
    class="${cn(styles, 'root', {
    'avatar_size-m': props.m,
    'avatar_size-s': props.s,
    avatar_gutterBottom: props.gutterBottom,
  })}"
  >
    <div class="${styles.img}"></div>
  </div>
`;

export default getAvatarTmpl;
