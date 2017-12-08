import { observable, action } from "mobx";
import { geolocated, GeolocatedProps } from "react-geolocated";
import Axios from "axios";

export interface IMarker {
    long: number;
    lat: number;
}

export class Model {
    constructor(url: string) {
        //Axios.get(url).then(response => console.log(response.data));
        Axios.get(url).then(response => { 
            console.log("Data loaded", response.data);
            }
        );
    }
    @observable data: any[];
    @observable long: number = 0;
    @observable lat: number = 0;
    @observable markers: IMarker[] = [];

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
}