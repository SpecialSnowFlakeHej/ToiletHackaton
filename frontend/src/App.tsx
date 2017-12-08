import * as React from 'react';
import { Component } from 'react';
import { MapComponent } from "./Map";
import { Model } from './Model';

export class App extends Component<{},{}> {
    render(){
        const model = new Model();
        model.getLocation();
        return (
            <div id="container">
                <MapComponent model={model} />
            </div>
        );
    }
}