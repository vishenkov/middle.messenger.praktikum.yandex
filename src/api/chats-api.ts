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
}

export default new ChatsApi();
