import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import Router from './router/router';
import Route from './router/route';
import BaseComponent, { Props } from './base-component';
import Native from '../components/native';

class TestComponent extends BaseComponent {
  constructor(props: Props) {
    super(props, {
      Native,
    });
  }

  render() {
    return `<div>${this.props.text}</div>`;
  }
}
function getRouter() {
  return new Router('#root')
    .use('/login', TestComponent)
    .use('/registration', TestComponent)
    .default('/login');
}

describe('Router', () => {
  beforeEach(() => {
    const url = 'http://localhost';
    const dom = new JSDOM('<div id="root"></div>', { url });
    global.window = dom.window.document.defaultView as Window & typeof globalThis;
  });

  it('Should register routes', () => {
    const router = getRouter();
    router.start();

    expect(router.routes.length).to.gt(0);
  });

  it('Should find route', () => {
    const router = getRouter();

    expect(router.getRoute('/registration')).to.instanceOf(Route);
  });

  it('Router is singleton', () => {
    const router1 = getRouter();
    const router2 = getRouter();

    expect(router1).to.eq(router2);
  });

  it('Should modify history', () => {
    const router = getRouter();
    router.start();
    router.go('/registration');

    expect(router.history.length).to.eq(2);
  });
});
