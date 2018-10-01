import React, { Component } from "react";
import { TextField } from "@material-ui/core";

// export default (props) => <div>{props.text}</div>
export default class Message extends Component {
    constructor(props) {
        super(props)

        this.state = { text: props.text }
    }

    onChange = (e) => {
        // this.props.addContainerProp("text", e)
        this.setState({ text: e.target.value })
    }

    render() {
        return (
            <TextField disabled onChange={this.onChange} value={this.state.text} />
        )
    }
}