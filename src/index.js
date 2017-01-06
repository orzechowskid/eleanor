import {
  actionType,

  dispatchAction,
  buildRouteMaps
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

  onHashchange = () => {
    const route = window.location.hash.slice(1);

    if (route) {
      dispatchAction(this.routeMaps, route, this.store);
    }
  };

  registerRoutes = (routes) => {
    this.routeMaps = buildRouteMaps(this.store, routes);
  };

  setLocation = (route) => {
    window.location.hash = route;
    dispatchAction(this.routeMaps, route, this.store);
  };

  startRouting = (opts = {}) => {
    const {
      initialRoute = null,
      useLocationHash = false
    } = opts;
    let route = null;

    window.addEventListener(`hashchange`, this.onHashchange);
    window.addEventListener(`popstate`, this.onHashchange);

    if (useLocationHash && window.location.hash.length > 1) {
      route = window.location.hash.slice(1);
    } else {
      route = initialRoute || this.initialRoute || `/`;
    }

    window.history.replaceState(null, null, `#${route}`);
    dispatchAction(this.routeMaps, route, this.store);
  };

  stopRouting = () => {
    window.removeEventListener(`hashchange`, this.onHashchange);
  };
}

export { actionType };
export { Router };
export default Router;
