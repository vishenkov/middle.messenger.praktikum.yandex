import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class LoginApi extends BaseAPI {
  constructor() {
    super();

    this._http = new HTTPTransport('/auth/signin');
  }

  create(data) {
    return this._http.post('/', { data });
  }
}

export default new LoginApi();
