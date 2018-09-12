import React, { Component } from 'react';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles'
import requireAuth from './requireAuth';
import ContainerGrid from './ContainerGrid';

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

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: [
                { text: "NewItem" }
            ],
        }
    }

    loadDetails = () => JSON.parse(localStorage.getItem("schedule"));
    // [
    //     {
    //         data:
    //             <div>
    //                 Welcome {this.props.username} to your new fitness dashboard!
    //                     </div>,
    //         key: 'welcomeMessage',
    //         minWidth: 2,
    //         minHeight: 2,
    //         ready: true
    //     },
    // ];

    saveDetails = (containers) => localStorage.setItem("schedule", JSON.stringify(containers));

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