import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class LogoutApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/auth/logout');
  }

  create() {
    return this._http.post('/');
  }
}

export default new LogoutApi();
