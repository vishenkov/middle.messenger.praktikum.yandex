import cn from '../../lib/classnames';
import * as styles from './typography.css';

const getComponent = (modifiers) => {
  if (modifiers.h1) {
    return 'h2';
  }

  if (modifiers.h2) {
    return 'h2';
  }

  if (modifiers.h3) {
    return 'h3';
  }

  return 'p';
};

export default (modifiers) => {
  const component = getComponent(modifiers);

  const classNames = cn({
    [styles.h1]: modifiers.h1,
    [styles.h2]: modifiers.h2,
    [styles.h3]: modifiers.h3,
    [styles.body]: modifiers.body,
    [styles['typography_gutter-bottom']]: modifiers.gutterBottom,
  });

  return `
    <${component} 
      class="${classNames}">
    {{children}}
  </${component}>
`;
};
