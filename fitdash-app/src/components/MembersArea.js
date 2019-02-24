import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import * as actions from '../actions';
import requireAuth from './requireAuth';

import ResponsiveGridLayout from './ResponsiveGridLayout';
import MFPPieChartCals from './Containers/MFPPieChartCals';
import ContainerLoader from './ContainerLoader';
import MFPTable from './Containers/MFPTable';
import SimpleText from './Containers/SimpleText';
import MFPCalsDays from './Containers/MFPCalsDays';

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
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        overflowY: 'auto'
    },
    selectMenu: {
        display: 'none'
    },
    paperOverflow: {
        overflow: 'visible'
    }
});

class MembersArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deleteOpen: false,
            configureOpen: false,
            newContainerOpen: false,
            containers: [],
            select: '',
            configView: null
        };

        this.props.getUserDetails(() => {
            localStorage.setItem('dashboard-layout', this.props.layout)
            this.grid.reloadLayout();

            const containers = [
                {
                    component:
                        <SimpleText text={`Welcome ${this.props.username} to your new fitness dashboard!`}
                            showConfigureDialog={this.showConfigureDialog} />,
                    key: 'welcomeMessage',
                    minWidth: 2,
                    minHeight: 2,
                    ready: true
                },
                {
                    component: <MFPCalsDays showConfigureDialog={this.showConfigureDialog} />,
                    key: "mfpcals",
                    minWidth: 2,
                    minHeight: 10,
                    ready: true
                },
                {
                    component: <MFPPieChartCals showConfigureDialog={this.showConfigureDialog} />,
                    key: "mfpcals-chart",
                    minWidth: 4,
                    minHeight: 10,
                    ready: true
                },
                {
                    key: "mfpcals-table",
                    minWidth: 6,
                    minHeight: 8,
                    ready: true,
                    component: <MFPTable showConfigureDialog={this.showConfigureDialog} />
                }
            ]
            this.setState({ containers })
            this.props.getMFP()
            this.props.getMFPMeals()
        });
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.props.saveDetails());
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.props.saveDetails());
    }

    addDataToContainer = (key, data) => {
        const { containers } = this.state;
        containers.map(item => {
            if (item.key === key) {
                const newItem = item;
                newItem.data = data;
                newItem.ready = true;
                return newItem;
            }
            return item;
        })
        this.setState({ containers });
    }

    handleOpenNewContainerSelect = () => {
        this.setState({ newContainerOpen: true });
    }

    handleCloseNewContainerSelect = () => {
        this.setState({ newContainerOpen: false });
    }

    handleAddNewContainer = (e) => {
        const { containers } = this.state;
        if (e.target.value === 1) {
            containers.push({
                data:
                    <div />,
                key: `container-${containers.length}-${Math.random() * 100}`,
                minWidth: 4,
                minHeight: 4
            })
        }
        this.setState({ containers })
    }

    getContainer = key => this.state.containers.find(container => container.key === key)

    showConfigureDialog = (configView) => {
        this.setState({ configureOpen: true, configView })

    }

    handleClickConfigureSave = () => {
        this.setState({ configureOpen: false });
    }

    handleClickCancelConfigure = () => {
        this.setState({ configureOpen: false });
    }

    handleClickDelete = (key) => {
        this.setState({ deleteOpen: true, containerToDelete: key })
    }

    handleClickConfirmDelete = () => {
        this.setState({ deleteOpen: false, containerToDelete: null });
        const { containers } = this.state;
        const newContainers = containers.filter(item => item.key !== this.state.containerToDelete);
        this.setState({ containers: newContainers })
    }

    handleClickCancelDelete = () => {
        this.setState({ deleteOpen: false, containerToDelete: null });
    }

    render() {
        const { classes } = this.props;
        const { containers } = this.state;
        return (
            <div className={classes.root}>
                <span>
                    <Select
                        IconComponent={() => (
                            <IconButton
                                onClick={this.handleOpenNewContainerSelect}
                                color="primary"
                                className={classes.button}
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                        disableUnderline
                        classes={{ selectMenu: classes.selectMenu }}
                        open={this.state.newContainerOpen}
                        onClose={this.handleCloseNewContainerSelect}
                        onOpen={this.handleOpenNewContainerSelect}
                        onChange={this.handleAddNewContainer}
                        value={this.state.select}
                    >
                        <MenuItem value={1}>Empty container</MenuItem>
                        <MenuItem value={2}>Different container</MenuItem>
                        <MenuItem value={3}>Another different container</MenuItem>
                    </Select>
                    <Dialog
                        open={this.state.deleteOpen}
                        onClose={this.handleClose}
                    >
                        <DialogTitle id="alert-dialog-title">Delete container?</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this container?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClickCancelDelete} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClickConfirmDelete} color="primary" autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.configureOpen}
                        onClose={this.handleClose}
                        classes={{ paper: classes.paperOverflow }}
                    >
                        <DialogTitle id="alert-dialog-title">Configure container</DialogTitle>
                        <DialogContent>
                            {this.state.configView}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClickCancelConfigure} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleClickConfigureSave} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <ResponsiveGridLayout saveDetails={this.props.saveDetails} ref={instance => { this.grid = instance; }}>
                        {containers.map(item => (
                            <div key={item.key} data-grid={{ w: item.minWidth || 2, h: item.minHeight || 2, x: 0, y: 50, minW: item.minWidth || 2, minH: item.minHeight || 2 }}>
                                <Paper square className={classes.paper}>

                                    <ContainerLoader ready={item.ready}>
                                        <div style={{ height: "100%", width: '100%' }}>
                                            {item.component}
                                        </div>
                                    </ContainerLoader>
                                </Paper>
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </span>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        mfpWeek: state.mfp.mfpWeek,
        mfpMeals: state.mfp.mfpMeals,
        layout: state.auth.layout
    }
}

export default compose(
    requireAuth,
    connect(mapStateToProps, actions),
    withStyles(styles)
)(MembersArea);