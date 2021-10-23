import BaseAPI from './base-api';

import { Indexed } from '../lib/types';

class ChatsApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  create(data: Indexed) {
    return this._http.post('/', { data });
  }

  loadAll() {
    return this._http.get('/');
  }

  getChatUsers(id: number) {
    return this._http.get(`/${id}/users`);
  }

  addUser(data: Indexed) {
    return this._http.put('/users', { data });
  }

  removeUser(data: Indexed) {
    return this._http.delete('/users', { data });
  }
}

export default new ChatsApi();
