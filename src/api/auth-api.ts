import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class AuthApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/auth');
  }

  getUser() {
    return this._http.get('/user');
  }

  login(data) {
    return this._http.post('/signin', { data });
  }

  logout() {
    return this._http.post('/logout');
  }

  registration(data) {
    return this._http.post('/signup', data);
  }
}

export default new AuthApi();
