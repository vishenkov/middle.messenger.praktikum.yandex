import { Token, User } from '../api/types';
import Socket from '../socket';
import store from '../store';

class MessagesController {
  socket: Socket;

  init(chatId: number) {
    const { user, tokens } = store.getState();

    if (!user) {
      return;
    }

    const token = (tokens as Record<number, Token>)[chatId];

    if (!token) {
      return;
    }

    const userId = (user as User).id;
    const socket = new Socket(userId, chatId, token as unknown as string);
    this.socket = socket;
  }

  sendMessage(message: string) {
    this.socket.sendMessage(message);
  }

  readMessages() {
    this.socket.readMessages();
  }
}

export default new MessagesController();
