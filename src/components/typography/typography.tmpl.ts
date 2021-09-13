import cn from '../../lib/classnames';
import * as styles from './typography.css';

const getComponent = (variant) => {
  switch (variant) {
    case 'h1':
      return 'h2';

    case 'h2':
      return 'h2';

    case 'h3':
      return 'h3';

    case 'h4':
      return 'h4';

    default:
      return 'p';
  }
};

export default (props) => {
  const component = getComponent(props.variant);

  const classNames = cn(styles, {
    h1: props.variant === 'h1',
    h2: props.variant === 'h2',
    h3: props.variant === 'h3',
    h4: props.variant === 'h4',
    body: props.variant === 'body',
    'typography_gutter-bottom': props.gutterBottom,
  });

  return `
    <${component} 
      class="${classNames}">
    {{children}}
  </${component}>
`;
};