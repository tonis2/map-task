import React from 'react';
import ReactDOM from 'react-dom';
import Map from "./components/map";
import Sidebar from "./components/sidebar";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <div id="wrapper">
      <Sidebar></Sidebar>
      <Map data={store}></Map>
    </div>
  </Provider>,
  document.getElementById('root')
);
