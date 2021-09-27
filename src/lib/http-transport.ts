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
  get = (url: string, options: Options = {}) => {
    const resultUrl = options.data
      ? `${url}${queryStringify(options.data)}`
      : url;

    return this.request(resultUrl,
      { ...options, method: METHODS.GET, data: null },
      options.timeout);
  };

  post = (url: string, options: Options = {}) => this.request(url,
    { ...options, method: METHODS.POST },
    options.timeout);

  put = (url: string, options: Options = {}) => this.request(url,
    { ...options, method: METHODS.PUT },
    options.timeout);

  delete = (url: string, options: Options = {}) => this.request(url,
    { ...options, method: METHODS.DELETE },
    options.timeout);

  request = (url: string, options: RequestOption, timeout = 5000) => {
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

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as unknown as XMLHttpRequestBodyInit);
      }
    });
  };
}

export default HTTPTransport;
