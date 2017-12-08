import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Model } from "./Model";
const {L}: any = window;

export interface MapProps {
    model: Model;
}

@observer
export class MapComponent extends Component<MapProps, {}> {
    

    componentDidUpdate() {
        const pos = [this.props.model.lat, this.props.model.long]
        var mymap = L.map('map').setView(pos, 13);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);
        
        var marker = L.marker(pos).addTo(mymap);
    }

    render() {  
        const {model} = this.props; 
        return (
            <div>
                <div>longitude: {model.long}</div>
                <div>lattitude: {model.lat}</div>
                <div id="map" style={{width: "100%", height: "100vh"}} />
            </div>
        );
    }
}