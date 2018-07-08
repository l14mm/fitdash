import React from "react";
import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';

import { history } from '../helpers/history';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../components/PrivateRoute';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

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
        <Switch>
          <PrivateRoute exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
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

const connectedApp = connect(mapStateToProps)(Main);
export default connectedApp;