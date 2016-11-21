import pathToRegexp from 'path-to-regexp';

const NAMESPACE = `pageRouter`;
const ACTION_TYPE = `${NAMESPACE}/TRIGGER_ROUTE`;

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
 * @return {Object} a Redux action in Flux Standard Action form
 */
const buildReduxAction = (routeMaps, route) => {
  const matchedRoute = routeMaps.find((routeMap) => {
    return routeMap.regexp.test(route);
  });

  if (!matchedRoute) {
    return;
  }

  const routeParamResults = matchedRoute.regexp.exec(route);

  return {
    meta: {
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
};

export { ACTION_TYPE as actionType };
export { buildReduxAction };
export { buildRouteMaps };
export { getRouteFromElement };
export default {
  actionType: ACTION_TYPE,

  buildReduxAction,
  buildRouteMaps,
  getRouteFromElement
};
