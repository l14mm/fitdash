import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';

const ConfigureContainer = props => {
    return (
        <div style={{ height: "20px", width: "100%", display: "table" }}>
            <span>
                <IconButton color="primary" aria-label="delete" disableRipple style={{ height: "auto" }}>
                    <DeleteIcon style={{ fontSize: 20 }} />
                </IconButton>
                <IconButton onClick={props.configureClicked} color="primary" aria-label="settings" disableRipple style={{ height: "auto" }}>
                    <SettingsIcon style={{ fontSize: 20 }} />
                </IconButton>
            </span>
        </div>
    )
}

export default ConfigureContainer;