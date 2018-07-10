import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles'
import requireAuth from './requireAuth'
import { Map } from './Maps/Map';
import GoogleApiComponent from './Maps/GoogleApiComponent';
import { Container, MapsContainer } from './Maps/Container';

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
                </Card><div id="map" />
                <MapsContainer />
            </div>
        )
    }
}


export default requireAuth(withStyles(styles)(MembersArea));