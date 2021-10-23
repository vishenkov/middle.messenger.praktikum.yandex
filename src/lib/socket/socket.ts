import EventBus from '../services/event-bus';
import { EVENTS } from './types';

class Socket extends EventBus {
  _baseApiUrl = 'wss://ya-praktikum.tech/ws/chats';

  socket: WebSocket;

  _url: string;

  constructor(url: string) {
    super();
    this._url = url;
  }

  start() {
    const socket = new WebSocket(`${this._baseApiUrl}/${this._url}`);
    this.socket = socket;

    socket.addEventListener('open', () => {
      this.emit(EVENTS.open);
    });

    socket.addEventListener('close', (event) => {
      this.emit(EVENTS.close, event);
    });

    socket.addEventListener('message', (event) => {
      this.emit(EVENTS.message, event.data);
    });

    socket.addEventListener('error', (event) => {
      this.emit(EVENTS.error, event);
    });
  }

  sendMessage(data: Record<string, unknown>) {
    return this.socket.send(JSON.stringify(data));
  }

  destroy() {
    this.socket.close();
  }
}

export default Socket;
