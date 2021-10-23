import { Props } from '../../lib/base-component';
import cn from '../../lib/classnames';
import styles from './button.css';

const Button = (props: Props) => {
  const typeProp = props.type ?? 'button';

  const classNames = cn(styles, 'button', {
    'button_full-width': props.fullWidth,
    'button_gutter-bottom': props.gutterBottom,
    button_primary: !props.secondary,
    button_secondary: props.secondary,
  });

  return `
    <button
      class="${classNames}"
      type="${typeProp}"
    >
      <span class="${styles.button__text}">${props.label}</span>
    </button>
`;
};

export default Button;
