import HTTPTransport from '../lib/http-transport';
import BaseAPI from './base-api';

class RegistrationApi extends BaseAPI {
  _httpInstance: HTTPTransport;

  constructor() {
    super();
    this._http = new HTTPTransport('/auth/signup');
  }

  create(data) {
    return this._http.post('/', data);
  }
}

export default new RegistrationApi();
