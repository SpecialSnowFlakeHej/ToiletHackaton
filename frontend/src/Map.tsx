import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Model } from "./Model";

const { L }: any = window;

export interface MapProps {
    model: Model;
}

@observer
export class MapComponent extends Component<MapProps, {}> {

    private map: any = null;
    private userLoc: any = null;
    private markers: any = null;
    componentDidUpdate() {
        const { model } = this.props;
        const pos = [model.lat, model.long];
        this.map ? this.map.setView(pos, 15) :
            this.map = L.map('map').setView(pos, 15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: '',
            id: 'mapbox.streets'
        }).addTo(this.map);

        this.markers ? this.markers.clearLayers() : this.markers = new L.FeatureGroup();

        // device location
        this.markers.addLayer(L.circle(pos, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.8,
            radius: 5
        }));

        model.data ? model.data.forEach(m => {
            this.markers.addLayer(L.marker([m.position.lat, m.position.long]).on("click", () => { model.onSelectWC(m) }).bindPopup(
                `Jméno: ${m.name}</br>
                Cena: ${m.price ? m.price : 0} Kč</br>
                ${m.lastCleaned ? "Naposledy uklizeno: " + m.lastCleaned : ""}`));
        }) : null;
        console.log("data", model.data);
        this.map.addLayer(this.markers);
    }

    render() {
        const { model } = this.props;
        return (
            <div>
                {console.log("need rerender", model.long)}
                <div className="menu">
                    <div className="logo">

                        <svg version="1.1" viewBox="0 0 23 44" xmlns="http://www.w3.org/2000/svg" >
                            <g transform="translate(0,-253)">
                                <path d="m0.32635 253.04 2.3353 16.578 17.741 0.0466 2.403-16.624zm0.17001 18.316v2.5836h21.804v-2.5836zm0.61857 4.4974c0.0709 5.2231 4.7166 9.4959 10.307 9.4978 5.59-3e-3 10.139-4.2027 10.21-9.425zm5.424 10.137-1.1968 10.998h12.204l-1.2128-10.904a8.5359 4.3965 0 0 1-4.7687 0.75462 8.5359 4.3965 0 0 1-5.0261-0.84829z" strokeWidth=".26669" />
                            </g>
                            <g transform="translate(0,-253)" strokeWidth=".26458">
                                <path d="m144.86 52.716h-31.538l-1e-5 -31.538h31.538z" opacity="0" />
                                <path d="m143.52 40.154-33.409 5.0781-5.0781-33.409 33.409-5.0781z" opacity="0" />
                            </g>
                        </svg>
                    </div>
                    <div className="brandName">
                        WCExp
                    </div>
                    <div className="search">
                        <input className="searchInput" type="input" placeholder="Místo"
                            onChange={(e) => model.onLocationChange(e)}
                            onKeyUp={(e => { e.keyCode === 13 ? model.onSubmitLocation() : null })} />
                        <input className="searchButton" type="button" onClick={model.onSubmitLocation} value="Odeslat" />
                    </div>
                </div >
                <div id="map" style={{ width: "100%", height: "70vh" }} > </div>
            </div >
        );
    }
}