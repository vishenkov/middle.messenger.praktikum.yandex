import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class UserApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/user');
  }

  read() {
    return this._http.get('/');
  }

  changePassword(data) {
    return this._http.put('/password', { data });
  }

  changeProfile(data) {
    return this._http.put('/profile', { data });
  }

  search(data) {
    return this._http.post('/search', { data });
  }
}

export default new UserApi();
