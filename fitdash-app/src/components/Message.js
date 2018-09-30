import React, { Component } from "react";
import { TextField } from "@material-ui/core";

// export default (props) => <div>{props.text}</div>
export default class Message extends Component {
    constructor(props) {
        super(props)
    }

    onChange = (e) => { this.props.addContainerProp("text", e) }

    render() {
        return (
            <TextField onChange={this.onChange} value={this.props.text} />
        )
    }
}