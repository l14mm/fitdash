import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions/user.actions';

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: {
        username: "username1",
        email: "email1",
        password: "password1",
      },
      submitted: false
    };
  }

  handleChange(event) {
    const { id, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [id]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.email && user.username && user.password) {
      dispatch(userActions.register(user));
    }
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
    const { classes, registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <div className={classes.hint}>Register</div>
            <TextField
              required
              id="username"
              label="username"
              className={classes.textField}
              margin="normal"
              value={user.username}
              onChange={this.handleChange}
            />
            <TextField
              required
              id="email"
              label="email address"
              className={classes.textField}
              margin="normal"
              value={user.email}
              onChange={this.handleChange}
            />
            <TextField
              required
              id="password"
              label="password"
              className={classes.textField}
              margin="normal"
              value={user.password}
              onChange={this.handleChange}
            />
            <TextField
              required
              id="passwordconf"
              label="confirm password"
              className={classes.textField}
              margin="normal"
              value={user.password}
              onChange={this.handleChange}
            />
            <Button type="submit" variant="contained" color="secondary" className={classes.button} style={{ margin: '10px' }}
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

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Register));
// export default withStyles(styles)(Register);
