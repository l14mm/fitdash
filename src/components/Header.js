import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const styles = theme => ({
    toolbar: {
        background: "linear-gradient(45deg, #8e24aa 0%, #ff6e40 100%)",
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white'
    },
    toolbarRight: {
        float: 'right'
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
            <Toolbar className={classes.toolbar}>
                <Link to="/" className={classes.link}>
                    <Typography className={classes.title} variant="title" color="primary">
                        Planets App
                </Typography>
                </Link>
                <div className={classes.toolbarRight}>
                    <Link to="/membersarea" className={classes.link}>
                        <Button className={classes.title}>
                            Members Area
                        </Button>
                    </Link>
                    {this.renderLinks(classes)}
                </div>
            </Toolbar>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(withStyles(styles)(Header));