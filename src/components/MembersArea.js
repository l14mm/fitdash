import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';
import { compose } from 'redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import { Responsive, WidthProvider } from 'react-grid-layout';
import ResponsiveGridLayout from './ResponsiveGridLayout';

import * as actions from '../actions';

import requireAuth from './requireAuth';
import MyFancyComponent from './Maps/MapsContainer';
import MapWithADirectionsRenderer from './Maps/MapWithADirectionsRender';
import MapWithASearchBox from './Maps/MapWithASearchBox';
// import MyGraph from './CollisionDetection';
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';
import { Button, IconButton } from '../../node_modules/@material-ui/core';



// const ResponsiveReactGridLayout = WidthProvider(Responsive);



const styles = theme => ({
    card: {
        width: '300px',
        margin: '2px',
        textAlign: 'left',
        fontSize: '0px',
    },
    cardHeader: {
        color: 'white'
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        // padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%'
    },
    grid: {
        // alignItems: 'stretch'
    }
})

class MembersArea extends Component {
    constructor(props) {
        super(props);

        this.props.getUserDetails(() => {
            // this.props.history.push('/membersarea');
        });

        this.state = {

        };
    }

    render() {
        console.log('layout')
        console.log(this.props.layout)
        localStorage.setItem('dashboard-layout', this.props.layout)
        const { classes, username } = this.props;
        // const DATA = [32, 57, 112, 293];
        // const layout = [
        //     { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
        //     { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
        //     { i: 'c', x: 4, y: 0, w: 1, h: 2 }
        // ];

        return (
            <div className={classes.root}>
                {/* <GridList cellHeight={50} spacing={10} className={classes.gridList}>
                    <GridListTile key={'tile.img'} cols={2} rows={1}>
                        <GridListTileBar
                            title={'mytitle'}
                            titlePosition="top"
                            actionIcon={
                                <IconButton className={classes.icon}>
                                    <StarBorderIcon />
                                </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                    <GridListTile key={'tile.img'} cols={1} rows={1}>
                        <Paper square className={classes.paper}>
                            <div>
                                Name: {username}
                            </div>
                        </Paper>
                    </GridListTile>
                    <GridListTile key={'tile.img'} cols={1} rows={1}>
                        <Paper square className={classes.paper}>
                            <MapWithASearchBox />
                        </Paper>
                    </GridListTile>
                </GridList> */}
                <ResponsiveGridLayout layout={this.props.layout}>
                    <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                        <Paper square className={classes.paper}>
                            <div>
                                Name: {username}
                            </div>
                        </Paper>
                    </div>
                    <div key="2" data-grid={{ w: 4, h: 12, x: 2, y: 0, minW: 2, minH: 3 }}>
                        <Paper square className={classes.paper}>
                            {/* <MapWithASearchBox /> */}
                        </Paper>
                    </div>
                </ResponsiveGridLayout>

                {/* <Grid container spacing={24} className={classes.grid}>
                    <Grid item xs={6} >
                        <Paper square className={classes.paper}>
                            <div>
                                Name: {username}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper square className={classes.paper}>
                            <MapWithASearchBox />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper square className={classes.paper}>
                            <BarGraph data={[5, 10, 1, 3, 5, 5, 10]} size={[500, 500]} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper square className={classes.paper}>xs=12 sm=6</Paper>
                    </Grid>
                </Grid> */}
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        layout: state.auth.layout
    }
}

export default compose(
    requireAuth,
    connect(mapStateToProps, actions),
    // WidthProvider(Responsive),
    withStyles(styles)
)(MembersArea);