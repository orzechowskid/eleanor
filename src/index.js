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
      registerRoutes(routes);

      if (startRouting) {
        this.startRouting();
      }
    }
  }

  /**
   * invoked when the popstate event is fired
   */
  onPopstate = () => {
    const route = window.location.hash.slice(1);

    if (route) {
      dispatchAction(this.routeMaps, route, this.store);
    }
  };

  /**
   * register a list of routes with the router
   *
   * @param {List<Object>} routes - a list of route objects
   */
  registerRoutes = (routes) => {
    this.routeMaps = buildRouteMaps(routes);
  };

  /**
   * manually trigger a route
   *
   * @param {String} route - a route to trigger
   */
  setLocation = (route) => {
    window.location.hash = route;
    dispatchAction(this.routeMaps, route, this.store);
  };

  /**
   * begin listening for routing events
   *
   * @param {Object} opts
   */
  startRouting = (opts = {}) => {
    const {
      initialRoute = null,
      useLocationHash = false
    } = opts;
    const currentRoute = window.location.hash.slice(1) || null;
    let route = null;

    window.addEventListener(`popstate`, this.onPopstate);

    if (useLocationHash && window.location.hash.length > 1) {
      route = window.location.hash.slice(1);
    } else {
      route = initialRoute || this.initialRoute || `/`;
    }

    if (route !== currentRoute) {
      window.history.pushState(null, null, `#${route}`);
    }

    dispatchAction(this.routeMaps, route, this.store);
  };

  stopRouting = () => {
    window.removeEventListener(`popstate`, this.onPopstate);
  };
}

export { actionType };
export { Router };
export default Router;
