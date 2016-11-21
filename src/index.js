import {
  actionType,

  dispatchAction,
  buildRouteMaps,
  getRouteFromElement
} from './utils';

class Router {
  constructor(args) {
    const {
      initialRoute,
      routes,
      startRouting,
      store
    } = args;

    if (!store || !store.dispatch) {
      throw new Error(`Redux store must be provided to router`);
    }

    this.initialRoute = initialRoute;
    this.store = store;

    if (routes) {
      this.routeMaps = buildRouteMaps(store, routes);
    }

    if (startRouting) {
      this.startRouting();
    }
  }

  onLinkClick = (event) => {
    const el = event.path ? event.path[0] : event.target;
    const route = getRouteFromElement(el);

    if (!route) {
      return;
    }

    dispatchAction(this.routeMaps, route, this.store);
  };

  registerRoutes = (routes) => {
    this.routeMaps = buildRouteMaps(this.store, routes);
  };

  setLocation = (route) => {
    dispatchAction(this.routeMaps, route, this.store);
  };

  startRouting = (opts = {}) => {
    document.addEventListener(`click`, this.onLinkClick, true);

    const {
      initialRoute = null,
      useLocationHash = false
    } = opts;
    let route = initialRoute || this.initialRoute;

    if (!route && useLocationHash && window.location.hash.length > 1) {
      route = window.location.hash.slice(1);
    }

    if (route) {
      console.log(`start routing:`, route);
      dispatchAction(this.routeMaps, route, this.store);
    }

    if (this.initialRoute) {
      this.initialRoute = null;
    }
  };

  stopRouting = () => {
    document.removeEventListener(`click`, this.onLinkClick);
  };
}

export { actionType };
export { Router };
export default Router;
