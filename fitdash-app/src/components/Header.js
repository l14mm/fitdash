import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar } from "@material-ui/core";


const styles = theme => ({
    appBar: {
        backgroundColor: 'white',
        // boxShadow: 'none'
    },
    toolbar: {
        // backgroundColor: theme.palette.secondary,
        display: 'flex',
        justifyContent: 'space-between',
        // color: 'white'
    },
    title: {
        color: 'gray'
    },
    toolbarRight: {
        float: 'right',
        color: "#2c3e50"
    },
    link: {
        textDecoration: 'none'
    }
});

class Header extends Component {
    renderLinks(classes) {
        if (this.props.authenticated) {
            return (
                <span>
                    <Link to="/membersarea" className={classes.link}>
                    <Button className={classes.title}>
                            Members Area
                    </Button>
                    </Link>
                    <Link to="/schedule" className={classes.link}>
                    <Button className={classes.title}>
                            Schedule
                    </Button>
                    </Link>
                    <Link to="/editprofile" className={classes.link}>
                        <Button className={classes.title}>
                            Edit Profile
                        </Button>
                    </Link>
                    <Link to="/logout" className={classes.link}>
                        <Button className={classes.title}>
                            Logout
                    </Button>
                    </Link>
                </span>
            )
        }
        return (
            <span>
                <Link to="/login" className={classes.link}>
                    <Button className={classes.title}>
                        Login
                        </Button>
                </Link>
                <Link to="/register" className={classes.link}>
                    <Button className={classes.title}>
                        Register
                        </Button>
                </Link>
            </span>
        )

    }

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Link to="/" className={classes.link}>
                        <Typography className={classes.title} variant="h6" color="secondary">
                            FitDash
                        </Typography>
                    </Link>
                    <div className={classes.toolbarRight}>
                        {this.renderLinks(classes)}
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));