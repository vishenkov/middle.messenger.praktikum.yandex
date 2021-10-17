import Route from './route';

class Router {
  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    this._defaultPathname = null;

    Router.__instance = this;
  }

  use(pathname, block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  default(pathname) {
    this._defaultPathname = pathname;

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    let route = this.getRoute(pathname);

    if (!route) {
      route = this.getRoute(this._defaultPathname);
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(pathname);
    this._currentRoute = route;
  }

  go(pathname, state = {}) {
    this.history.pushState(state, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
