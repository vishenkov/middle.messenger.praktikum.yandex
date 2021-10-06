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
    const baseURl = `${this._baseApiUrl}${url}`;
    const resultUrl = options.data
      ? `${baseURl}${queryStringify(options.data)}`
      : baseURl;

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
    const {
      method, data, headers = {
        'Content-Type': 'application/json',
      },
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (headers) {
        Object.keys(headers).forEach((key) => {
          const value = headers[key];

          if (isString(value)) {
            xhr.setRequestHeader(key, value);
          }
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'error' });
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
