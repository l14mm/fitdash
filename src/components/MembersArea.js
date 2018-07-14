import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../actions';
import requireAuth from './requireAuth';
import ResponsiveGridLayout from './ResponsiveGridLayout';
import MapWithASearchBox from './Maps/MapWithASearchBox';
import MFPPieChartPCF from './MFPPieChartPCF';
import MFPPieChartCals from './MFPPieChartCals';
import MFPCalsLine from './MFPCalsLine';

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

        this.state = {
            dashboardReady: false
        };

        this.props.getUserDetails(() => {
            if (this.props.layout !== undefined) {
                localStorage.setItem('dashboard-layout', this.props.layout)
            }
            this.setState({ dashboardReady: true })
        });
    }

    render() {
        const { classes, username } = this.props;
        return (
            <div className={classes.root}>
                {this.state.dashboardReady ? (
                    <ResponsiveGridLayout>
                        <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
                            <Paper square className={classes.paper}>
                                <div>
                                    Name: {username}
                                </div>
                            </Paper>
                        </div>
                        <div key="2" data-grid={{ w: 4, h: 12, x: 2, y: 0, minW: 2, minH: 3 }}>
                            <Paper square className={classes.paper}>
                                <MapWithASearchBox />
                            </Paper>
                        </div>
                        <div key="3" data-grid={{ w: 4, h: 12, x: 2, y: 0, minW: 2, minH: 3 }}>
                            <Paper square className={classes.paper}>
                                <MFPPieChartPCF />
                            </Paper>
                        </div>
                        <div key="4" data-grid={{ w: 4, h: 12, x: 2, y: 0, minW: 2, minH: 3 }}>
                            <Paper square className={classes.paper}>
                                <MFPPieChartCals />
                            </Paper>
                        </div>
                        <div key="5" data-grid={{ w: 4, h: 12, x: 2, y: 0, minW: 2, minH: 3 }}>
                            <Paper square className={classes.paper}>
                                <MFPCalsLine />
                            </Paper>
                        </div>
                        {/* <div key="5" data-grid={{ w: 4, h: 12, x: 2, y: 0, minW: 2, minH: 3 }}>
                            <Paper square className={classes.paper}>
                                <ScaleSVG
                                    width={400}
                                    height={400}
                                >
                                    <FancyPie width={800} height={800} margin={20} />
                                </ScaleSVG>
                            </Paper>
                        </div> */}
                    </ResponsiveGridLayout>
                ) : (<div />)}
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