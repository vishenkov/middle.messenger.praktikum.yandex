import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import styles from './avatar.css';

const getAvatarTmpl = (props: Props) => `
  <div
    class="${cn(styles, 'root', {
    'avatar_size-m': props.m,
    'avatar_size-s': props.s,
    avatar_gutterBottom: props.gutterBottom,
  })} ${props.className as string}"
  >
    <img src="https://ya-praktikum.tech/api/v2/resources${props.src}" class="${styles.img}" crossorigin="use-credentials" alt="🙃" />
  </div>
`;

export default getAvatarTmpl;
