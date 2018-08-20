import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const loader = (WrappedComponent) =>
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
                <div style={{ display: "flex", flexWrap: "wrap", height: "calc(100% - 10px)", alignItems: "center", justifyContent: "center" }}>{
                    !this.state.loaded ? (<CircularProgress size={50} />) : (
                        <WrappedComponent {...this.props} />
                    )}
                </div>
            )
        }
    }

export default loader;