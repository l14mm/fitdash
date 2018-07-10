import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    footer: {
        background: 'primary',
        width: '100%',
        height: '30px',
        textAlign: 'left',
        color: 'white'
    },
    p: {
        padding: '6px',
        paddingLeft: '20px',
        margin: '0'
    }
}

class Footer extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footer}>
                <p className={classes.p}>
                    {'Copyright © 2018 FitDash All rights reserved.'}
                </p>
            </div>
        )
    }
}

export default withStyles(styles)(Footer);