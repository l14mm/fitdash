import React, { Component } from "react";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LoginForm from "./LoginForm";

const styles = {
  toolbar: {
    background: "linear-gradient(45deg, #8e24aa 0%, #ff6e40 100%)"
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="app">
        <div className="header">
          <Toolbar className={classes.toolbar}>
            <Typography variant="title" color="primary">
              Planets App
            </Typography>
          </Toolbar>
        </div>
        <div className="main">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
