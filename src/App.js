import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';

import Header from "./components/Header";
import Main from "./Main";

const styles = {
};

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    return (
      <Router history={history}>
        <div className="app">
          <Header />
          <Main />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(withStyles(styles)(App));
