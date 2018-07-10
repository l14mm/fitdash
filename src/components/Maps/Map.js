import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class Map extends React.Component {
    componentDidMount() {
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }

    loadMap() {
        console.log(this.props);
        if (this.props && this.props.google) {
            // google is available
            console.log("google is abvailable")
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);

            const zoom = 14;
            const lat = 37.774929;
            const lng = -122.419416;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center,
                zoom
            })
            this.map = new maps.Map(node, mapConfig);
        }
        else {
            console.log("google not available")
        }
    }

    render() {
        return (
            <div ref='map'>
                Loading map...
            </div>
        )
    }
}