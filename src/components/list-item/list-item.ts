import BaseComponent, { Props } from '../../lib/base-component';
import * as styles from './list-item.css';

import Native from '../native';
import Avatar from '../avatar';
import Typography from '../typography';
import { Event } from '../../lib/types';
import Router from '../../lib/router';

class ListItem extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
      Typography,
      Avatar,
    });
  }

  handleClick(e: Event) {
    e.preventDefault();

    if (this.props.onClick) {
      this.props.onClick({ ...this.props });
      return;
    }

    if (this.props.href) {
      (new Router()).go(this.props.href);
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
