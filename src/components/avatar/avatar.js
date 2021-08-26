import cn from '../../lib/classnames';
import * as styles from './avatar.css';

const Avatar = (modifiers) => `
  <div
    class="${cn(styles, 'root', {
    'avatar_size-m': modifiers.m,
    'avatar_size-s': modifiers.s,
    avatar_gutterBottom: modifiers.gutterBottom,
  })}"
  >
    <div class="${styles.img}"></div>
  </div>
`;

export default Avatar;
