import React, { Component } from 'react';

import ColorPicker from 'material-ui-color-picker'

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