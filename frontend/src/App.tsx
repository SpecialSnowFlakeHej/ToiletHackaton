import * as React from 'react';
import { Component } from 'react';
import { MapComponent } from "./Map";
import { Reviews } from './Reviews';
import { Model } from './Model';

export class App extends Component<{},{}> {
    render(){
        const model = new Model("https://toilethackaton.eu-gb.mybluemix.net/data");
        model.getLocation();
        return (
            <div id="container">
                <MapComponent model={model} />
                <Reviews model={model} />
            </div>
        );
    }
}