import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class AuthApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/auth/user');
  }

  read() {
    return this._http.get('/');
  }
}

export default new AuthApi();