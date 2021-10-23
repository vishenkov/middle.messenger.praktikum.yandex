import BaseComponent, { Props } from '../../lib/base-component';
import styles from './message.css';

import Native from '../native';
import Avatar from '../avatar';
import Typography from '../typography';
import { Event } from '../../lib/types';
import Router from '../../lib/router';

import { State } from '../../lib/store/types';

import connect from '../../store/connect';
import { User } from '../../api/types';

function padZero(int: number) {
  return int < 10 ? `0${int}` : int;
}

type MessageProps = Props & {
  author: User
};

class Message extends BaseComponent {
  constructor(props: MessageProps) {
    super(props, {
      Native,
      Typography,
      Avatar,
    });
  }

  handleClick(e: Event) {
    e.preventDefault();

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
    const {
      content, isCurrentUserAuthor, time, author,
    } = this.props as MessageProps;
    const timeString = new Date(time as string);

    const hours = padZero(timeString.getHours());
    const minutes = padZero(timeString.getMinutes());
    const seconds = padZero(timeString.getSeconds());

    return (`
      <div class="${styles.message} ${isCurrentUserAuthor && styles.message_own}">
        <div class="${styles.message__chip} ${isCurrentUserAuthor && styles.message__chip_own}">
          <div class="${styles.message__content}">
            ${content}
          </div>
          <div class="${styles.message__date}">
            ${timeString.toDateString()}
            ${hours}:${minutes}:${seconds}
            ,
            ${author?.first_name} ${author?.second_name}
          </div>
        </div>
      </div>
    `);
  }
}

export default connect((state: State, ownProps) => ({
  author: (state.chatUsers as User[])[ownProps.userId as number],
  isCurrentUserAuthor: (state.user as User)?.id === ownProps.userId,
}))(Message);
