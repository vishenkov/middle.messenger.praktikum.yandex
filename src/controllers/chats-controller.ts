import chatsApi from '../api/chats-api';
import Router from '../lib/router/router';
import store from '../store';
import actions from '../store/actions';

import authApi from '../api/auth-api';
import tokenApi from '../api/token-api';

import handleError from './handleError';
import validate from './validate';

class ChatsController {
  @handleError()
  async loadAll() {
    const chats = await chatsApi.loadAll();
    store.dispatch({ type: actions.setChats, payload: chats });
  }

  @validate()
  @handleError()
  async createChat(data) {
    const chat = await chatsApi.create(data);
    (new Router()).go(`/messenger/${chat.id}`);
  }

  @handleError()
  async loadChat(id: number) {
    const { user } = store.getState();
    if (!user) {
      const currentUser = await authApi.getUser();
      store.dispatch({ type: actions.setUser, payload: currentUser });
    }

    const chatUsers = await chatsApi.getChatUsers(id);
    store.dispatch({ type: actions.setChatUsers, payload: chatUsers });

    const { token } = await tokenApi.create(id);
    store.dispatch({ type: actions.setToken, payload: { id, token } });
  }

  @handleError()
  async getToken(chatId: number) {
    const token = await tokenApi.create(chatId);
    store.dispatch({ type: actions.setToken, payload: { id: chatId, token } });
  }

  @handleError()
  async addUser(chatId: number, userId: number) {
    await chatsApi.addUser({
      users: [userId],
      chatId,
    });

    const router = new Router();
    router.go(`/messenger/${chatId}`);
  }

  @handleError()
  async removeUser(chatId: number, userId: number) {
    await chatsApi.removeUser({
      users: [userId],
      chatId,
    });

    const router = new Router();
    router.go(`/messenger/${chatId}`);
  }
}

export default new ChatsController();
