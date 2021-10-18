import { expect } from 'chai';
import * as Sinon from 'sinon';
import { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HttpTransport from './http-transport';

describe('Http transport', async () => {
  let requests: SinonFakeXMLHttpRequest[] = [];
  let xhr: SinonFakeXMLHttpRequestStatic;
  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function onCreate(request: any) {
      requests.push(request);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  it('Check GET request', async () => {
    const client = new HttpTransport('/');
    client.get('/');
    const request = requests[0];

    expect(request.method).to.equal('GET');
  });

  it('Check POST request', async () => {
    const client = new HttpTransport('/');
    client.post('/');
    const request = requests[0];

    expect(request.method).to.equal('POST');
  });

  it('Check PUT request', async () => {
    const client = new HttpTransport('/');
    client.put('/');
    const request = requests[0];

    expect(request.method).to.equal('PUT');
  });

  it('Check DELETE request', async () => {
    const client = new HttpTransport('/');
    client.delete('/');
    const request = requests[0];

    expect(request.method).to.equal('DELETE');
  });
});
