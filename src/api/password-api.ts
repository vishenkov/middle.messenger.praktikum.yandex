import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class PasswordApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/user/password');
  }

  put(data) {
    return this._http.put('/', { data });
  }
}

export default new PasswordApi();
