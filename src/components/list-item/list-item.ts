import BaseComponent, { Props } from '../../lib/base-component';
import styles from './list-item.css';

import Native from '../native';
import Avatar from '../avatar';
import Typography from '../typography';
import { Event } from '../../lib/types';
import Router from '../../lib/router';

type ListItemProps = Props & {
  onClick: (...args: unknown[]) => {};
};

class ListItem extends BaseComponent {
  constructor(props: ListItemProps) {
    super(props, {
      Native,
      Typography,
      Avatar,
    });
  }

  handleClick(e: Event) {
    e.preventDefault();

    if (this.props.onClick) {
      (this.props as ListItemProps).onClick({ ...this.props });
      return;
    }

    if (this.props.href) {
      (new Router()).go(this.props.href as string);
    }
  }

  registerHandlers() {
    this.setHandlers({
      handleClick: this.handleClick.bind(this),
    });
  }

  render() {
    const { title, avatar } = this.props;

    const AvatarTemplate = avatar
      ? `<Avatar s="true" src="${avatar}" className="${styles.avatar}" />`
      : '';

    return (
      `<li class="${styles.root}" onClick={{handleClick}}>
        ${AvatarTemplate}
        <Typography variant="body">
          ${title}
        </Typography>
      </li>`
    );
  }
}

export default ListItem;
