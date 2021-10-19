import Socket from '../lib/socket';
import { EVENTS } from '../lib/socket/types';
import isArray from '../lib/utils/is-array';
import store from '../store';
import actions from '../store/actions';

enum TYPES {
  getOld = 'get old',
  message = 'message',
}

class ChatSocket {
  _userId: number;

  _chatId: number;

  _token: string;

  socket: Socket;

  constructor(userId: number, chatId: number, token: string) {
    if ((this._userId === userId)
      && (this._chatId === chatId)
      && (this._token === token)
      && this.socket
    ) {
      return this;
    }

    if (this.socket) {
      this.socket.destroy();
    }

    this._userId = userId;
    this._chatId = chatId;
    this._token = token;

    this.socketInit();
  }

  socketInit() {
    const socket = new Socket(`${this._userId}/${this._chatId}/${this._token}`);

    socket.on(EVENTS.open, () => {
      this.readMessages();
    });

    socket.on(EVENTS.message, (rawData) => {
      const data = JSON.parse(rawData as string);
      if (isArray(data)) {
        data.forEach(this.processMessage);
      } else {
        this.processMessage(data);
      }
    });

    socket.start();

    this.socket = socket;
  }

  processMessage(message) {
    switch (message.type) {
      case TYPES.message: {
        store.dispatch({ type: actions.setMessage, payload: message });
        break;
      }

      case TYPES.getOld: {
        break;
      }

      default:
        console.warn('Not implemented socket type', message.type);
    }
  }

  sendMessage(message: string) {
    this.socket.sendMessage({
      type: TYPES.message,
      content: message,
    });
  }

  readMessages() {
    this.socket.sendMessage({
      type: TYPES.getOld,
      content: '0',
    });
  }
}

export default ChatSocket;
