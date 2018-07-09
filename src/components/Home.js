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

      <div className="header">

        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
          <h3>All registered users:</h3>
          {users.loading && <em>Loading users...</em>}
          {users.items &&
            <ul>
              {users.items.map((user, index) =>
                <li key={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                  {
                    user.deleting ? <em> - Deleting...</em>
                      : user.deleteError ? <span className="error"> - ERROR: {user.deleteError}</span>
                        : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                  }
                </li>
              )}
            </ul>
          }
          <p>
            <Link to="/login">Logout</Link>
          </p>
        </div>
        <p>Hello World!</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

export default connect(mapStateToProps)(Home);
// export default withStyles(styles)(Home);