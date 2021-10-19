import { Indexed } from '../lib/types';
import BaseAPI from './base-api';

import { Login } from './types';

class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
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
