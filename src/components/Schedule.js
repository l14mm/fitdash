import React, { Component } from 'react';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles'
import requireAuth from './requireAuth';
import ContainerGrid from './ContainerGrid';
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

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: [
                {
                    text: "Container Type 1",
                    containerType: 1,
                    props: [
                        { text: "hello3" }
                    ],
                    key: 'welcomeMessage',
                    minWidth: 2,
                    minHeight: 2,
                    ready: true
                },
            ],
        }
    }

    deserialiseContainers = (containers) => {
        try {
            return JSON.parse(containers).map(item => {
                const newItem = item;
                newItem.data = React.createElement(containerCodes[item.containerType], ...item.props);
                return newItem;
            })
        }
        catch (e) {
            console.log("error", e)
            return [];
        }
    }

    serialiseContainers = (containers) => JSON.stringify(containers);

    loadDetails = () => this.deserialiseContainers(localStorage.getItem("schedule"));

    saveDetails = (containers) => localStorage.setItem("schedule", this.serialiseContainers(containers))

    render() {
        const { containers, containerHovered, menuItems } = this.state;
        return (
            <ContainerGrid containers={containers} containerHovered={containerHovered}
                loadDetails={this.loadDetails} saveDetails={this.saveDetails} menuItems={menuItems} />
        )
    }
}

export default compose(
    requireAuth,
    // connect(mapStateToProps, actions),
    withStyles(styles)
)(Schedule);