# Eleanor
Elegant and nearly zero-config routing, for React/Redux apps
# About
react-router is a perfectly fine piece of software but I don't like the idea of having to render my route tree, or even of assuming that there's a (non-shallow) tree of routes at all.  I wanted something tiny which worked like page.js but which used Redux to notify my app of route changes, and which isn't couple with React, so here we are.
# Getting Started
    $ npm install --save eleanor
# Usage
Briefly: import/require the module in your usual way, create a new Router object, and pass it a list of objects each containing an Express-compatible route string and a React component (or, I suppose, any other thing you want associated with that route string).

Here's a simple example in ES6:

    // appReducer.js
    
    import {
      actionType as CHANGE_ROUTE
    } from 'eleanor';
    
    const INITIAL_STATE = {
      routeInfo: {
        route: null,
        component: null
      }
    };
    
    const appReducer = (currentState = INITIAL_STATE, action) => {
      switch (action.type) {
        case CHANGE_ROUTE:
          return {
            ...currentState,
            routeInfo: action.payload
          };
      }
    };
    
    
    // index.js
    
    import Router from 'eleanor';
    
    import MyChildComponent from 'components/MyChildComponent';
    import SomeOtherChildComponent from 'components/SomeOtherChildComponent';
    import YetAnotherChildComponent from 'components/YetAnotherChildComponent';
    
    import appReducer from 'reducers/appReducer';
    
    let appStore = createStore(appReducer);
    
    const router = new Router({
      store: appStore,
      routes: [{
        route: '/page1',
        component: MyChildComponent
      }, {
        route: '/page2/:param',
        component: SomeOtherChildComponent
      }, {
        route: '/page3/:param/:optionalParam?',
        component: YetAnotherChildComponent
      }]
    });
    
    router.startRouting();
    
    ReactDOM.render(<App />, document.getElementById('wherever'));
    
    
    // App.js
    
    import React from 'react';
    import {
      connect
    } from 'react-redux';
    
    const mapStateToProps = (appState) => {
      return appState.routeInfo;
    };

    const App = (props) => {
      const {
        component: ChildComponent
      } = props;
      
      return (
        <div>
          <ul>
            <li>
              <a href="#/page1">Page 1</a>
            </li>
            <li>
              <a href="#/page2/foo">Page 2</a>
            </li>
            <li>
              <a href="#/page3/foo/bar">Page 3</a>
            </li>
          </ul>
          {ChildComponent && (
            <ChildComponent />
          )}
        </div>
      );
    };
    
    export default connect(mapStateToProps)(App);
# API
### Router({opts})
    const router = new Router({
      store: Object // a Redux store.  required
      routes: Array<Object>  // a list of route definitions
    });
creates a new Eleanor router and, optionally, provide some routes.  `store` is the Redux store upon which the router will dispatch actions, and is a required field.  `routes` is a list of route-definition objects which look like this:

    route: String
    component: any
    
`component` is intended to be a `ReactElement` but can be any object or primitive you want.
### Router.registerRoutes(routes)
    router.registerRoutes(
      Array<Object> // a list of route definitions
    );
adds routes to an existing router.  `routes` is a list of route-definition objects which look like this:

    route: String
    component: any
    
`component` is intended to be a `ReactElement` but can be any object or primitive you want.
### Router.startRouting()
    router.startRouting();
tells your router to start listening for route changes.
### Router.stopRouting()
    router.stopRouting();
tells your router to stop listening for route changes.
# Redux Actions
A Redux action is created and dispatched upon each route change:
    import {
      actionType
    } from 'eleanor';
    
    const reducer = (state = {}, action) {
      switch (action.type) {
        case actionType:
          // route-change action was dispatched!
      }
    };
The dispatched action is a [Flux Standard Action](https://github.com/acdlite/flux-standard-action):

    type: String // action type
    payload: Object // the matched route-definition object
    meta: Object // additional information such as route params
`payload` is one of the route-definition objects passed to the router by the user.  `meta` currently contains one field, `routeParams`, which is a map of route params to route values.
