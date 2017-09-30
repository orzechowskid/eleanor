import pathToRegexp from 'path-to-regexp';

const NAMESPACE = `pageRouter`;
const ACTION_TYPE = `${NAMESPACE}/TRIGGER_ROUTE`;

/**
 * @param {Array<Object>} routes - a list of external route descriptions
 * @return {Array<Object>} a list of internal route mappings
 */
function buildRouteMaps(routes) {
    return routes.map((routeDescription) => {
        const regexpKeys = [];
        const regexp = pathToRegexp(routeDescription.route, regexpKeys);

        return {
            regexp,
            regexpKeys,
            routeDescription
        };
    });
}

/**
 * @param {Array<Object>} routeMaps - a list of internal route mappings
 * @param {String} route - a route which (potentially) matches a route map
 * @param {Object} store - a Redux store
 * @return {boolean} whether or not an action was dispatched
 */
function dispatchAction(routeMaps, route, store) {
    const matchedRoute = routeMaps.find(function(routeMap) {
        return routeMap.regexp.test(route);
    });

    if (!matchedRoute) {
        return false;
    }

    const routeParamResults = matchedRoute.regexp.exec(route);
    const action = {
        meta: {
            path: route,
            routeParams: matchedRoute.regexpKeys.reduce(function(obj, key, idx) {
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
}

export { ACTION_TYPE as actionType };
export { buildRouteMaps };
export { dispatchAction };
export default {
    actionType: ACTION_TYPE,

    buildRouteMaps,
    dispatchAction
};
