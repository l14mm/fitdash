import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reducers from './reducers'
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'),
 
);
registerServiceWorker();