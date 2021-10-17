import Socket from '../socket';
import store from '../store';

class MessagesController {
  socket: Socket;

  init(chatId: number) {
    const { user, tokens } = store.getState();

    if (!user) {
      return;
    }

    const token = tokens[chatId];

    if (!token) {
      return;
    }

    const userId = user.id;
    const socket = new Socket(userId, chatId, token);
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
