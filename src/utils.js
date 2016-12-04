import pathToRegexp from 'path-to-regexp';

const NAMESPACE = `pageRouter`;
const ACTION_TYPE = `${NAMESPACE}/TRIGGER_ROUTE`;

/**
 * @param {Object} store - a Redux store against which to dispatch actions
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
 * @param {String} route - a route against which to match
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

/**
 * @param {Element} el - a DOM element
 * @return {String} a hash route, or undefined
 */
const getRouteFromElement = (el) => {
  if (el.nodeName.toLowerCase() !== `a` ||
      el.hasAttribute(`download`) ||
      el.getAttribute(`rel`) === `external` ||
      el.target) {
    return;
  }

  const href = el.getAttribute(`href`);

  if (!href || href[0] !== `#`) {
    return;
  }

  return href.slice(1);
};

export { ACTION_TYPE as actionType };
export { buildRouteMaps };
export { dispatchAction };
export { getRouteFromElement };
export default {
  actionType: ACTION_TYPE,

  buildRouteMaps,
  dispatchAction,
  getRouteFromElement
};
