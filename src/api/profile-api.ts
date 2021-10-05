import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class ProfileApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/user/profile');
  }

  put(data) {
    return this._http.put('/', { data });
  }
}

export default new ProfileApi();
