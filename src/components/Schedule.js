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
        display: "flex",
        flexDirection: "row"
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
    deleteContainer: {

    },
    selectMenu: {
        display: 'none'
    },
    times: {
        display: "inline-block"
    },
    time: {
        padding: "12px",
        borderTop: "dashed"
    },
    container: {
        display: "flex",
        flexDirection: "row"
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
                        { text: "Random event" }
                    ],
                    key: `welcomeMessage-${Math.random()}`,
                    minWidth: 1,
                    minHeight: 1,
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
        const { classes } = this.props;
        const times = [];
        for (let i = 0; i < 24; i += 1) {
            let start = i;
            let end = i + 1;
            start = start < 10 ? `0${start}: 00` : `${start}: 00`;
            end = end < 10 ? `0${end}: 00` : `${end}: 00`;
            times.push(
                <div className={classes.time}>
                    {`${start} - ${end}`}
                </div>
            )
        }
        return (
            <div className={classes.root}>
                <div className={classes.times}>
                    {times}
                </div>
                <ContainerGrid className={classes.container} containers={containers} containerHovered={containerHovered}
                    loadDetails={this.loadDetails} saveDetails={this.saveDetails} menuItems={menuItems} />
            </div>
        )
    }
}

export default compose(
    requireAuth,
    // connect(mapStateToProps, actions),
    withStyles(styles)
)(Schedule);