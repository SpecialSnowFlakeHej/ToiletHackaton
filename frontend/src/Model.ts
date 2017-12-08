import { observable, action } from "mobx";
import { geolocated, GeolocatedProps } from "react-geolocated";

export class Model {
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
}