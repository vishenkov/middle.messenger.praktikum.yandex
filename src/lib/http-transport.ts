import isString from './utils/is-string';

enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

type TProps = Record<string, unknown>;

type Options = TProps & {
  timeout?: number;
  headers?: TProps;
  data?: TProps | null;
};

type RequestOption = Options & {
  method: METHODS;
};

function queryStringify(data: TProps) {
  const dataArray = Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    return [...acc, `${key}=${String(value)}`];
  }, []);
  const result = `?${dataArray.join('&')}`;
  return result;
}
class HTTPTransport {
  static apiUrl = 'https://ya-praktikum.tech/api/v2';

  _baseApiUrl: string;

  constructor(baseApiUrl: string) {
    this._baseApiUrl = `${HTTPTransport.apiUrl}${baseApiUrl}`;
  }

  get = (url: string, options: Options = {}) => {
    const resultUrl = options.data
      ? `${url}${queryStringify(options.data)}`
      : url;

    return this.request(resultUrl,
      { ...options, method: METHODS.GET, data: null },
      options.timeout);
  };

  post = (url: string, options: Options = {}) => this.request(`${this._baseApiUrl}${url}`,
    { ...options, method: METHODS.POST },
    options.timeout);

  put = (url: string, options: Options = {}) => this.request(`${this._baseApiUrl}${url}`,
    { ...options, method: METHODS.PUT },
    options.timeout);

  delete = (url: string, options: Options = {}) => this.request(`${this._baseApiUrl}${url}`,
    { ...options, method: METHODS.DELETE },
    options.timeout);

  private request = (url: string, options: RequestOption, timeout = 5000) => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) {
        Object.keys(headers).forEach((key) => {
          const value = headers[key];

          if (isString(value)) {
            xhr.setRequestHeader(key, value);
          }
        });
      }

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.timeout = timeout;

      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
