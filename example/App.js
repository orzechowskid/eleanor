import React from 'react';
import {
  connect
} from 'react-redux';

const mapStateToProps = (appState) => {
  return appState;
};

const App = (props) => {
  const routeInfo = props.routeInfo;
  const {
    component: View
  } = routeInfo;

  return (
    <div>
      <ul>
        <li>
          <a href="#/one">Page 1</a>
        </li>
        <li>
          <a href="#/item/0b478b78e75ea4c0643a/details">Item Details</a>
        </li>
        <li>
          <a href="#/two">Page 2</a>
        </li>
        <li>
          <a href="#/three">Page 3</a>
        </li>
      </ul>
      <div>
        {View && (
           <View />
         )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(App);
