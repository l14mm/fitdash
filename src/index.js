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
import MembersArea from './components/MembersArea'
import Logout from './components/Logout';
import EditProfile from "./components/EditProfile";

const store = createStore(
  reducers,
  { auth: { authenticated: localStorage.getItem('token') } },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/membersarea' component={MembersArea} />
        <Route path='/editprofile' component={EditProfile} />
      </App>
    </Router>
  </Provider>
  , document.getElementById('root'),

);
registerServiceWorker();