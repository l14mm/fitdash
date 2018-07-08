import React, { Component } from "react";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Header from "./components/Header";
import Main from "./components/Main";

const styles = {
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
        <Header />
        <Main />
      </div>
    );
  }
}

export default withStyles(styles)(App);
