import React, { Component } from 'react';
import { compose } from 'redux';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
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

import ResponsiveGridLayout from './ResponsiveGridLayout';
import ContainerLoader from './ContainerLoader';
import Message from './Message';

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
    grid: {
        // alignItems: 'stretch'
    },
    button: {
        // margin: theme.spacing.unit,
    },
    deleteContainer: {

    },
    selectMenu: {
        display: 'none'
    }
});

const containerCodes = {
    1: Message
}

class ContainerGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerHovered: -1,
            deleteOpen: false,
            newContainerOpen: false,
            containers: this.props.loadDetails(),
            select: '',
            menuItems: this.props.menuItems
        }
    }

    handleOpenNewContainerSelect = () => {
        this.setState({ newContainerOpen: true });
    }

    handleCloseNewContainerSelect = () => {
        this.setState({ newContainerOpen: false });
    }

    handleAddNewContainer = (e) => {
        const { containers } = this.state;
        const item = this.state.menuItems[e.target.value];
        item.props.edit = console.log("i'm being edited")
        containers.push({
            data: React.createElement(containerCodes[item.containerType], ...item.props),
            props: item.props,
            containerType: item.containerType,
            key: `container-${containers.length}-${Math.random() * 100}`,
            minWidth: item.minWidth,
            minHeight: item.minHeight,
            ready: true,
            y: item.y || 10
        })
        this.setState({ containers })
    }

    handleClickDelete = (key) => {
        this.setState({ deleteOpen: true, containerToDelete: key })
    }

    handleClickEdit = (key) => {
        this.setState({ containerToEdit: key })
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

    hoverButton = (index) => {
        this.setState({ containerHovered: index === false ? -1 : index });
    }

    render() {
        const { classes, saveDetails, menuItems } = this.props;
        const { containerHovered, containers } = this.state;
        return (
            <span style={{ flex: 5 }}>
                <Select
                    IconComponent={() => (
                        <IconButton
                            onClick={this.handleOpenNewContainerSelect}
                            color="primary"
                            className={classes.button}
                            style={{ zIndex: 1 }}
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
                    style={{ float: "left" }}
                >
                    {menuItems.map((item, index) => <MenuItem key={item.key} value={index}>{item.text}</MenuItem>)}
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
                <ResponsiveGridLayout saveDetails={() => saveDetails(this.state.containers)} ref={instance => { this.grid = instance; }} compactType={null}>
                    {containers ? containers.map((item, index) => (
                        <div key={item.key} data-grid={{ w: item.minWidth || 2, h: item.minHeight || 2, x: 0, y: item.y, minW: item.minWidth || 2, minH: item.minHeight || 2 }}>
                            <Paper square className={classes.paper}>
                                <div style={{ height: "20px", width: "100%", display: "table" }} onMouseEnter={() => this.hoverButton(index)} onMouseLeave={() => this.hoverButton(false)}>
                                    {containerHovered === index ?
                                        (<span>
                                            <IconButton onClick={() => this.handleClickDelete(item.key)} color="primary" aria-label="delete" className={classes.deleteContainer} disableRipple style={{ height: "auto" }}>
                                                <DeleteIcon style={{ fontSize: 20 }} />
                                            </IconButton>
                                            <IconButton color="primary" aria-label="settings" className={classes.deleteContainer} disableRipple style={{ height: "auto" }}>
                                                <SettingsIcon style={{ fontSize: 20 }} />
                                            </IconButton>
                                            <IconButton onClick={() => this.handleClickEdit(item.key)} color="primary" aria-label="settings" className={classes.deleteContainer} disableRipple style={{ height: "auto" }}>
                                                <EditIcon style={{ fontSize: 20 }} />
                                            </IconButton>
                                        </span>)
                                        : (<div />)}
                                </div>
                                <ContainerLoader ready={item.ready}>
                                    <div style={{ height: "100%", width: '100%' }}>
                                        {item.data}
                                    </div>
                                </ContainerLoader>
                            </Paper>
                        </div>
                    )) : null}
                </ResponsiveGridLayout>
            </span>
        )
    }
}

export default compose(
    withStyles(styles)
)(ContainerGrid);