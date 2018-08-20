import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Container extends Component {
    constructor() {
        super();
        this.state = {
            loaded: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loaded: true })
        }, 2000);
    }

    render() {
        return (
            <div style={{ display: "flex", flexWrap: "wrap", height: "calc(100% - 10px)", width: "100%", alignItems: "center", justifyContent: "center" }}>{
                !this.props.ready ? (<CircularProgress size={50} />) : (
                    { ...this.props.children }
                )}
            </div>
        )
    }
}

export default Container;