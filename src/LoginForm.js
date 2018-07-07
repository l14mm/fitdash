import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/LockOutline";

const styles = theme => ({
  // container: {
  //   display: "flex",
  //   flexWrap: "wrap"
  // },
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 200
  // },
  // menu: {
  //   width: 200
  // },
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    // background: "url(https://source.unsplash.com/random/1600x900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  card: {
    minWidth: 300,
    marginTop: "6em"
  },
  avatar: {
    margin: "1em",
    display: "flex",
    justifyContent: "center"
  },
  icon: {
    backgroundColor: theme.palette.secondary.main
  },
  hint: {
    marginTop: "1em",
    display: "flex",
    justifyContent: "center",
    color: theme.palette.grey[500]
  },
  form: {
    padding: "0 1em 1em 1em"
  },
  input: {
    marginTop: "1em"
  },
  actions: {
    padding: "0 1em 1em 1em"
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    name: "",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <form onSubmit={handleSubmit(this.login)}>
            <div className={classes.hint}>Hint: demo / demo</div>
            <div className={classes.form}>
              <div className={classes.input}>
                <Field
                  name="username"
                  component={renderInput}
                  label={translate("ra.auth.username")}
                  disabled={isLoading}
                />
              </div>
              <div className={classes.input}>
                <Field
                  name="password"
                  component={renderInput}
                  label={translate("ra.auth.password")}
                  type="password"
                  disabled={isLoading}
                />
              </div>
            </div>
            <CardActions className={classes.actions}>
              <Button
                variant="raised"
                type="submit"
                color="primary"
                disabled={isLoading}
                className={classes.button}
                fullWidth
              >
                {isLoading && <CircularProgress size={25} thickness={2} />}
                {translate("ra.auth.sign_in")}
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(LoginForm);
