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
        var approx = 0;
        if(model.selectedReview.length > 0) {
            model.selectedReview.forEach(r => approx += r.stars);
            approx = (approx / model.selectedReview.length).toFixed(1) as any;
        }
        return (
            <div style={{margin: 10}} >
                <h2 style={{borderBottom: "1px solid grey", margin: 10}} >Recenze</h2>
                <div style={{display: "inline-block"}} >
                    <span style={{display: "block"}} >{"Jméno: " + model.selectedWc.name}</span>
                    <span style={{display: "block"}} >{"Cena: " + model.selectedWc.price}</span>
                    <span style={{display: "block"}} >{"Počet toalet: " + model.selectedWc.toilets.length}</span>
                    <span style={{display: "block"}} >{"Naposledy uklizeno: " + model.selectedWc.lastCleaned}</span>
                </div>
                <div style={{display: "inline-block", marginLeft: 30}} >
                    <h4 style={{display: "block", margin: 5}} >Ohodnotit: </h4>
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
                    <div style={{marginLeft: 20}}>
                        <h3 style={{marginTop:5}} >Průměr: {approx}/5 ★</h3>
                    </div>
                    <div>
                        {model.selectedReview.map((r, idx) => <div key={idx} style={{display: "inline-block", marginLeft: 20}} >
                            <span>{r.stars}/5 ★</span><br />
                            <span>{r.message}</span>
                        </div>)}
                    </div>
                </div>
            </div>
        );
    }
}