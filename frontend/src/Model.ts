import { observable, action } from "mobx";
import { geolocated, GeolocatedProps } from "react-geolocated";
import Axios from "axios";
import { Moment } from "moment";

export interface IMarker {
    long: number;
    lat: number;
}

export interface IData {
    lastCleaned: Moment;
    lastUsed: Moment;
    price: number;
    position: IMarker;
    name: string;
}

export class Model {
    constructor(url: string) {
        //Axios.get(url).then(response => console.log(response.data));
        Axios.get(url).then(response => { 
            console.log("Data loaded", response.data);
            response.data.forEach(d => this.data.push({ 
                name: d.name,
                price: d.price,
                lastCleaned: d.last_clean,
                lastUsed: d.last_shit,
                position: {long: d.lon, lat: d.lat}
            }))
        });

    }
    @observable data: IData[] = [];
    @observable long: number = 0;
    @observable lat: number = 0;

    @action.bound getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
    }
    
    @action.bound showPosition(position) {
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
        console.log("Latitude: " + position.coords.latitude + 
        "Longitude: " + position.coords.longitude)
    }

    private locationText = "";
    @action.bound onLocationChange(e: React.ChangeEvent<HTMLInputElement>){
        this.locationText = e.target.value;
    }

    @action.bound onSubmitLocation() {
        Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.locationText}&key=AIzaSyA0S4pAN29Tbl0g7OeV_r_o3GtgIkU52f4`)
        .then(response => {
            console.log("changed pos");
            const loc = response.data.results[0].geometry.location;
            this.lat = loc.lat;
            this.long = loc.lng;
        });
    }
}