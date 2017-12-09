import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Model } from "./Model";
import * as Rating from "react-rating";

export interface ReviewsProps {
    model: Model;
}

@observer
export class Reviews extends Component<ReviewsProps, {}> {
    render() {
        const {model} = this.props;
        if (!model.selectedWc) return <span style={{margin: 30}} >Zvolte toaletu pro více informací</span>
        return (
            <div style={{margin: 10}} >
                <h2 style={{borderBottom: "1px solid grey"}} >Recenze</h2>
                <div style={{display: "inline-block"}} >
                    <span style={{display: "block"}} >{"Jméno: " + model.selectedWc.name}</span>
                    <span style={{display: "block"}} >{"Cena: " + model.selectedWc.price}</span>
                    <span style={{display: "block"}} >{"Počet toalet: " + model.selectedWc.toilets.length}</span>
                    <span style={{display: "block"}} >{"Naposledy uklizeno: " + model.selectedWc.lastCleaned}</span>
                </div>
                <div style={{display: "inline-block", marginLeft: 30}} >
                    <span style={{display: "block"}} >Hodnocení: </span>
                    <Rating  style={{display: "block"}} 
                        empty="fa fa-star-o fa-2x"
                        full="fa fa-star fa-2x"
                        fractions={2}
                        onChange={(rate) => {
                            model.onRate(rate);
                        }}
                    />
                    <input type="input" placeholder="Hodnocení"
                        onChange={model.onReview} />
                    <input type="button" onClick={e => {model.onSubmitReview()}} value="Odeslat" />
                </div>
                <div style={{display:"inline-block"}} >
                        {model.selectedReview.map((r, idx) => <div key={idx} style={{display: "inline-block", marginLeft: 20}} >
                            <span>{r.stars}/5 ★</span><br />
                            <span>{r.message}</span>
                        </div>)}
                </div>
            </div>
        );
    }
}