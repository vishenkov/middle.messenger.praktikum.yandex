import HTTPTransport from '../lib/http-transport';

abstract class BaseAPI {
  _http: HTTPTransport;

  create?(data: unknown): Promise<unknown>;

  read?(id?: string): Promise<unknown>;

  update?(id: string, data: unknown): Promise<unknown>;

  put?(id: string, data: unknown): Promise<unknown>;

  delete?(id: string): Promise<unknown>;
}

export default BaseAPI;
