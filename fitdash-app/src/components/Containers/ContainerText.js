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


class ContainerText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            key: 'welcomeMessage',
            minWidth: 2,
            minHeight: 2,
            ready: true,
            configView: (
                <ColorPicker
                    name='color'
                    defaultValue='#000'
                    onChange={color => console.log(color)}
                />
            )
        }
    }

    render() {
        const { text } = this.props;
        return (
            <div>
                {text}
            </div>
        )
    }
}

export default ContainerText;