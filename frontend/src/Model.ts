import { observable, action } from "mobx";
import { geolocated, GeolocatedProps } from "react-geolocated";
//import Axios from "axios";
import * as moment from "moment";

export interface IMarker {
    long: number;
    lat: number;
}

export interface IData {
    id: string;
    lastCleaned: any;
    lastUsed: any;
    price: number;
    position: IMarker;
    name: string;
    toilets: any[];
}

export interface IReview {
    message: string;
    stars: number;
}

export class Model {
    constructor(url: string) {
        fetch(url).then(response => { 
            response.json().then(data => {
                console.log(data[2])
                    data.forEach(d => this.data.push({ 
                    id: d._id,
                    name: d.name,
                    price: d.price,
                    lastCleaned: moment(d.last_clean),
                    lastUsed: d.last_shit,
                    position: {long: d.lon, lat: d.lat},
                    toilets: d.rooms
                }))
            });
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
    }

    private locationText = "";
    @action.bound onLocationChange(e: React.ChangeEvent<HTMLInputElement>){
        this.locationText = e.target.value;
    }

    @action.bound onSubmitLocation() {
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.locationText}&key=AIzaSyA0S4pAN29Tbl0g7OeV_r_o3GtgIkU52f4`)
        .then(response => {
            console.log("changed pos");
            const loc = response.json().then(data => {
                const loc = data.results[0].geometry.location;
                this.lat = loc.lat;
                this.long = loc.lng;
            });
        });
    }

    @observable selectedWc: IData = null;
    @observable selectedReview: IReview[] = [];
    @action.bound onSelectWC(wc: IData){
        this.selectedWc = wc;
        this.selectedReview = [];
        fetch(`https://toilethackaton.eu-gb.mybluemix.net/reviews?id=${wc.id}`).then(response => { 
            response.json().then(data => {
                console.log("response", data);
                data.forEach(d => this.selectedReview.push({message: d.message, stars: d.stars}));
            });
        });
    }

    private rating = 0;
    @action.bound onRate(rate: number) {
        this.rating = rate;
    }

    private review: string = "";
    @action.bound onReview(e: React.ChangeEvent<HTMLInputElement>) {
        this.review = e.target.value;
        console.log(this.review);
    }

    @action.bound onSubmitReview() {
        console.log("rating", this.selectedWc.id, this.rating, this.review);
        fetch('https://toilethackaton.eu-gb.mybluemix.net/reviews', {
            method: 'POST',
            body: JSON.stringify({id: this.selectedWc.id, stars: this.rating, message: this.review})
          })
    }
}