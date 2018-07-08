import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

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

class Login extends Component {
  constructor(props) {
    super(props);

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.state = { username: "username133", password: "password1" };


    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log("login constructor");
  }

  // handleInputChange(event) {
  //   const target = event.target;
  //   const id = target.id;
  //   const value = target.value;
  //   this.setState({ [id]: value });
  // }

  handleChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
    // this.login();
  }

  login() {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      credentials: "include",
      redirect: 'follow',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": this.state.username,
        "password": this.state.password,
      })
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          console.log("ok response");
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
        console.error("caught error");
        console.error(error);
      });
  }

  render() {
    const { classes, loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className={classes.main}>
        <Card className={classes.card}>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <div className={classes.hint}>Login</div>
            {loggingIn && <p>Logging in</p>}
            {submitted && <p>Submitter</p>}
            <TextField
              required
              id="username"
              label="username"
              className={classes.textField}
              margin="normal"
              value={username}
              onChange={this.handleChange}
            />
            <TextField
              required
              id="password"
              label="password"
              className={classes.textField}
              margin="normal"
              value={password}
              onChange={this.handleChange}
            />
            <Button type="submit" variant="contained" color="secondary" className={classes.button} style={{ margin: '10px' }}
              disabled={!this.validateForm()}
            >
              Login
            </Button>
            <CardActions className={classes.actions} />
          </form>
        </Card>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
// export default withStyles(styles)(Login);
