import BaseComponent, { Props } from '../../lib/base-component';
import * as styles from './messages.css';

import Native from '../native';
import Avatar from '../avatar';
import Message from '../message';
import Typography from '../typography';
import { Event } from '../../lib/types';
import Router from '../../lib/router';

class Messages extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
      Typography,
      Avatar,
      Message,
    });
  }

  handleClick(e: Event) {
    e.preventDefault();

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
    const { messages } = this.props;
    console.log('messages', messages);

    return (`
      <div class="${styles.root}">
        ${messages?.map((message) => `
          <Message
            content="${message.content}"
            userId="${message.user_id}"
            time="${message.time}"
          />
        `).join('')}
      </div>
    `);
  }
}

export default Messages;
