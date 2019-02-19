import React, { Component } from 'react';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles'
import requireAuth from './requireAuth';
import ContainerGrid from './ContainerGrid';
import Message from './Containers/Message';

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
                        { text: "Random event", addContainerProp: this.addContainerProp },
                    ],
                    key: `welcomeMessage-${Math.random()}`,
                    minWidth: 1,
                    minHeight: 2,
                    ready: false,
                    y: 2
                },
            ],
            containerProps: []
        }
        this.addContainerProp = this.addContainerProp.bind(this)
    }

    deserialiseContainers = (containers) => {
        try {
            console.log("containers:", containers)
            if (containers === undefined) { return []; }
            console.log('saved', JSON.parse(containers))
            return JSON.parse(containers).map(item => {
                const newItem = item;
                newItem.data = React.createElement(containerCodes[item.containerType], ...item.props);
                return newItem;
            });
        }
        catch (e) {
            console.log("error", e)
            console.log("containers", containers)
            return [];
        }
    }

    // serialiseContainers = (containers) => JSON.stringify(containers);
    serialiseContainers = (containers) =>
        JSON.stringify(containers.map(item => {
            var newItem = item;
            console.log(item)
            newItem.newprops = 2;
            return newItem;
        }));


    loadDetails = () => this.deserialiseContainers(localStorage.getItem("schedule"));

    saveDetails = (containers) => localStorage.setItem("schedule", this.serialiseContainers(containers))

    addContainerProp(key, value) {
        console.log(key, value)
        console.log('state', this.state)
        var newContainerProps = this.state.containerProps;
        newContainerProps.addContainerProp({key, value})
        this.setState({containerProps: newContainerProps})
    }

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
                <div key={start} className={classes.time}>
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