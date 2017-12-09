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
    
private map: any = null;
private userLoc: any = null;
private markers: any = null;
    componentDidUpdate() {
        const {model} = this.props;
        const pos = [model.lat, model.long];
        this.map? this.map.setView(pos, 15) :
        this.map = L.map('map').setView(pos, 15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(this.map);

        this.markers? this.markers.clearLayers() : this.markers = new L.FeatureGroup();
        
        // device location
        this.markers.addLayer( L.circle(pos, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.8,
            radius: 5
        }));

        model.data? model.data.forEach(m => {
            this.markers.addLayer(L.marker([m.position.lat, m.position.long]).on("click", () => {model.onSelectWC(m)}).bindPopup(
                `Jméno: ${m.name}</br>
                Cena: ${m.price? m.price : 0} Kč</br>
                ${m.lastCleaned? "Naposledy uklizeno: " + m.lastCleaned : ""}`));
        }) : null;
        console.log("data", model.data);
        this.map.addLayer(this.markers);
    }

    render() {  
        const {model} = this.props; 
        return (
            <div>
                {console.log("need rerender", model.long)}
                <input type="input" placeholder="Místo"
                    onChange={(e) => model.onLocationChange(e)}
                    onKeyUp={(e => {e.keyCode === 13? model.onSubmitLocation() : null})} />
                <input type="button" onClick={model.onSubmitLocation} value="Odeslat" />
                <div id="map" style={{width: "100%", height: "70vh"}} > </div>
            </div>
        );
    }
}