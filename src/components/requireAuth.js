import React, { Component } from 'react';
import { connect } from 'react-redux';

// Higher order component
export default ChildComponent => {
    class ComposedComponent extends Component {
        // Our component just got rendered
        componentDidMount() {
            this.shouldNavigateAway();
        }

        // Our component just got updated
        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            // If user is not authentication, send to login screen
            if (!this.props.auth) {
                this.props.history.push('/login');
            }
        }

        render() {
            return <ChildComponent {...this.props} />;
        }
    }
    function mapStateToProps(state) {
        return { auth: state.auth.authenticated };
    }
    return connect(mapStateToProps)(ComposedComponent);
};