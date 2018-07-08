import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Router>
      <Provider store={store}>
        <Route component={App} />
      </Provider>
    </Router>, document.getElementById('root'),
  );
registerServiceWorker();