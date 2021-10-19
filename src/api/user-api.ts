import BaseAPI from './base-api';

import { Indexed } from '../lib/types';

class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  read() {
    return this._http.get('/');
  }

  changePassword(data: Indexed) {
    return this._http.put('/password', { data });
  }

  changeProfile(data: Indexed) {
    return this._http.put('/profile', { data });
  }

  search(data: Indexed) {
    return this._http.post('/search', { data });
  }

  changeAvatar(data: Indexed) {
    return this._http.put('/profile/avatar', {
      data,
      headers: {},
    });
  }
}

export default new UserApi();
