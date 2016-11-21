import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
} from 'react-redux';
import {
  createStore
} from 'redux';
import Router, {
  actionType as ROUTE_CHANGE_ACTION_TYPE
} from '../dev/yarrr';

import App from './App';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

const INITIAL_STATE = {
  routeInfo: {}
};

const appReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROUTE_CHANGE_ACTION_TYPE:
      return {
        ...currentState,
        routeInfo: {
          ...action.payload,
          ...action.meta
        }
      };

    default:
      return currentState;
  }
};

let store = createStore(appReducer);

const router = new Router({
  store
});

router.registerRoutes([{
  component: PageOne,
    route: '/one'
  }, {
    component: PageOne,
    route: '/one/:param'
  }, {
    component: PageOne,
    route: '/item/:id/:section'
  }, {
    component: PageTwo,
    route: '/two'
  }, {
    component: PageThree,
    route: '/three'
  }]);

router.startRouting();

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
