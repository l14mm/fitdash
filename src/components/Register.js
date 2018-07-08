import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/LockOutline";

const apiUrl = "http://localhost:3000";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
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
    padding: "0 1em 1em 1em",
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginTop: "1em"
  },
  actions: {
    padding: "0 1em 1em 1em"
  }
});

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = { username: "username1", email: "email1", password: "password1" };
  }

  handleInputChange(event) {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    this.setState({ [id]: value });
  }

  handleRegister() {
    fetch(`${apiUrl}/register`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "username": this.state.username,
        "password": this.state.password,
        "passwordConf": this.state.passwordConf,
      })
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          console.log("ok");
          console.log(response.data);
        }
        else if (response.status === 401) {
          console.log("unauthorised!");
        }
        else {
          console.log(response.status);
        }
      }
      )
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <form className={classes.form}>
            <div className={classes.hint}>Register</div>
            <TextField
              required
              id="username"
              label="username"
              className={classes.textField}
              margin="normal"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <TextField
              required
              id="email"
              label="email address"
              className={classes.textField}
              margin="normal"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <TextField
              required
              id="password"
              label="password"
              className={classes.textField}
              margin="normal"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <TextField
              required
              id="passwordconf"
              label="confirm password"
              className={classes.textField}
              margin="normal"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <Button variant="contained" color="secondary" className={classes.button} style={{ margin: '10px' }} onClick={this.handleRegister}
            >
              Register
            </Button>
            <CardActions className={classes.actions} />
          </form>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
