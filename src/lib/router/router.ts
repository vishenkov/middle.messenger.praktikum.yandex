import BaseComponent from '../base-component';
import { Type } from '../types';
import Route from './route';

class Router {
  private static instance: Router;

  routes: Array<Route>;

  history: History;

  private _currentRoute?: Route;

  private _rootQuery: string;

  private _defaultPathname: string;

  constructor(rootQuery?: string) {
    if (Router.instance) {
      return Router.instance;
    }

    if (!rootQuery) {
      throw new Error('rootQuery is required!');
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    Router.instance = this;
  }

  use(pathname:string, block: Type<BaseComponent>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  default(pathname: string) {
    this._defaultPathname = pathname;

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      // @ts-ignore
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute(this._defaultPathname);
    }

    if (!route) {
      throw new Error(`Route ${pathname} is not provided!`);
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(pathname);
    this._currentRoute = route;
  }

  go(pathname: string, state = {}) {
    this.history.pushState(state, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
