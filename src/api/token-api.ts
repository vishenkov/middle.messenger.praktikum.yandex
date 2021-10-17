import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class TokenApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/chats/token');
  }

  create(id: number) {
    return this._http.post(`/${id}`);
  }
}

export default new TokenApi();
