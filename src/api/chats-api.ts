import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class ChatsApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/chats');
  }

  create(data) {
    return this._http.post('/', { data });
  }

  loadAll() {
    return this._http.get('/');
  }

  getChatUsers(id) {
    return this._http.get(`/${id}/users`);
  }

  addUser(data) {
    return this._http.put('/users', { data });
  }

  removeUser(data) {
    return this._http.delete('/users', { data });
  }
}

export default new ChatsApi();
