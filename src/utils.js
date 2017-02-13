import pathToRegexp from 'path-to-regexp';

const NAMESPACE = `pageRouter`;
const ACTION_TYPE = `${NAMESPACE}/TRIGGER_ROUTE`;

/**
 * @param {Object} store - a Redux store to which actions are dispatched
 * @param {Array<Object>} routes - a list of external route descriptions
 * @return {Array<Object>} a list of internal route mappings
 */
const buildRouteMaps = (store, routes) => {
  return routes.map((routeDescription) => {
    let regexpKeys = [];
    const regexp = pathToRegexp(routeDescription.route, regexpKeys);

    return {
      regexp,
      regexpKeys,
      routeDescription
    };
  });
};

/**
 * @param {Array<Object>} routeMaps - a list of internal route mappings
 * @param {String} route - a route which (potentially) matches a route map
 * @param {Object} store - a Redux store
 * @return {boolean} whether or not an action was dispatched
 */
const dispatchAction = (routeMaps, route, store) => {
  const matchedRoute = routeMaps.find((routeMap) => {
    return routeMap.regexp.test(route);
  });

  if (!matchedRoute) {
    return false;
  }

  const routeParamResults = matchedRoute.regexp.exec(route);
  const action = {
    meta: {
      path: window.location.hash.slice(1),
      routeParams: matchedRoute.regexpKeys.reduce((obj, key, idx) => {
        return {
          ...obj,
          [key.name]: routeParamResults[1 + idx]
        };
      }, {})
    },
    payload: matchedRoute.routeDescription,
    type: ACTION_TYPE
  };

  store.dispatch(action);

  return true;
};

export { ACTION_TYPE as actionType };
export { buildRouteMaps };
export { dispatchAction };
export default {
  actionType: ACTION_TYPE,

  buildRouteMaps,
  dispatchAction
};
