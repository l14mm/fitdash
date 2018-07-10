import React, { Container } from 'react';
import { Map } from './Map';
import GoogleApiComponent from './GoogleApiComponent';
import config from '../../config';

export class MapsContainer extends React.Component {
    render() {
        console.log("hi")
        // if (!this.props.loaded) {
        //     return <div>Loading...</div>
        // }
        const style = {
            width: '100vw',
            height: '100vh'
        }
        return (
            <div style={style}>
                <Map google={this.props.google}
                />
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: config.gmapAPIKEY
})(Container)