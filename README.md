# Eleanor
Elegant and nearly zero-config routing for Redux apps
# Getting Started
    $ npm install --save eleanor
# Usage
Briefly: import/require the module in your usual way, create a new Router object, and pass it a list of objects each containing an Express-compatible route string and a React component (or anything, really).

Here's a simple example:

    // appReducer.js
    
    import {
      actionType as CHANGE_ROUTE
    } from 'eleanor';
    
    const INITIAL_STATE = {
      routeInfo: {
        
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
          <ChildComponent />
        </div>
      );
    };
    
    export default connect(mapStateToProps)(App);
