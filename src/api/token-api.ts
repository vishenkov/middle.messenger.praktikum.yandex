import BaseAPI from './base-api';

class TokenApi extends BaseAPI {
  constructor() {
    super('/chats/token');
  }

  create(id: number) {
    return this._http.post(`/${id}`);
  }
}

export default new TokenApi();
