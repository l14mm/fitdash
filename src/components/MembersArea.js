import React, {Component} from 'react';
import requireAuth from './requireAuth'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '../../node_modules/@material-ui/core';

const styles = {
    card: {
        width: '300px',
        margin: '2px',
        textAlign: 'left',
        fontSize: '0px',
    },
    cardHeader: {
        color: 'white'
    }
}

class MembersArea extends Component {
    render() {
        const { classes } = this.props;
    return (
        <div>
            <Card className={classes.card}>
                <CardHeader className={classes.cardHeader}
                title="Members area" />
            </Card>
        </div>
    )
}
}


export default requireAuth(withStyles(styles)(MembersArea));