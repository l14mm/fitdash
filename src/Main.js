import React from "react";
import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

class Main extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <main>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <p>Main</p>
        {/* <Switch> */}
        <PrivateRoute exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        {/* </Switch> */}
      </main>
    )
  }
}


function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = withRouter(connect(mapStateToProps)(Main));
export default connectedApp;