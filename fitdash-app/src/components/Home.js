import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import { CardHeader } from '../../node_modules/@material-ui/core';

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: '1 0 auto'
  },
  card: {
    minWidth: 300,
    marginTop: "6em"
  },
});

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
         <CardHeader title="Welcome!" />
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Home);