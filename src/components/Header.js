import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from 'react-router-dom';

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
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return (
            <Toolbar className={classes.toolbar}>
                <Link to={`/`} className={classes.link}>
                    <Typography className={classes.title} variant="title" color="primary">
                        Planets App
                </Typography>
                </Link>
                <div className={classes.toolbarRight}>
                    <Link to={`/login`} className={classes.link}>
                        <Button className={classes.title}>
                            Login
                        </Button>
                    </Link>
                    <Link to={`/register`}  className={classes.link}>
                        <Button className={classes.title}>
                            Register
                        </Button>
                    </Link>
                </div>
            </Toolbar>
        );
    }
}

export default withStyles(styles)(Header);