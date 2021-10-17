import HTTPTransport from '../lib/http-transport';
import { Indexed } from '../lib/types';
import BaseAPI from './base-api';

import { Registration, Login } from './types';

class AuthApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/auth');
  }

  getUser() {
    return this._http.get('/user');
  }

  login(data: Login) {
    return this._http.post('/signin', { data });
  }

  logout() {
    return this._http.post('/logout');
  }

  registration(data: Indexed) {
    return this._http.post('/signup', data);
  }
}

export default new AuthApi();
