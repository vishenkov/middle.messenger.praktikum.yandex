import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class AvatarApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/user/profile/avatar');
  }

  put(data) {
    return this._http.put('/', {
      data,
      headers: {},
    });
  }
}

export default new AvatarApi();
