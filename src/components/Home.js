import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';


class Home extends Component {

  componentDidMount() {
  }

  handleDeleteUser(id) {
  }

  render() {
    const { user, users } = this.props;
    return (
      <div>
        Welcome!
      </div>
    );
  }
}

export default Home;
// export default withStyles(styles)(Home);