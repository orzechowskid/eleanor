import {
  actionType,

  buildReduxAction,
  buildRouteMaps,
  getRouteFromElement
} from './utils';

class Router {
  constructor(args) {
    const {
      initialRoute,
      routes,
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
  }

  onLinkClick = (event) => {
    const el = event.path ? event.path[0] : event.target;

    event.preventDefault();
    event.stopPropagation();

    const route = getRouteFromElement(el);

    if (!route) {
      return;
    }

    const action = buildReduxAction(this.routeMaps, route);

    if (action) {
      this.store.dispatch(action);
    }
  };

  registerRoutes = (routes) => {
    this.routeMaps = buildRouteMaps(this.store, routes);
  };

  setLocation = (path) => {
    console.log(`going to ${path}`);
  };

  startRouting = () => {
    document.addEventListener(`click`, this.onLinkClick, true);
  };

  stopRouting = () => {
    document.removeEventListener(`click`, this.onLinkClick);
  };
}

export { actionType };
export { Router };
export default Router;
