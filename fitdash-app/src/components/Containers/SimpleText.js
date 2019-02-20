import React, { Component } from 'react';

import ColorPicker from 'material-ui-color-picker'
import ConfigureContainer from './ConfigureContainer'

class SimpleText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: '#000000'
        }
    }

    configureClicked = () => this.props.showConfigureDialog(this.configView());

    configView() {
        return (
            <ColorPicker
                name='color'
                defaultValue='#000000'
                onChange={color => color && this.setState({color})}
            />
        )
    }

    render() {
        return (
            <>
                <ConfigureContainer {...this.props} configureClicked={this.configureClicked} configView={this.configView} />
                <div style={{background:this.state.color}}>
                    {this.props.text}
                </div>
            </>
        )
    }
}

export default SimpleText;