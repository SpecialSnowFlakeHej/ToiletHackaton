import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Model } from "./Model";
import * as Rating from "react-rating"

export interface ReviewsProps {
    model: Model;
}

@observer
export class Reviews extends Component<ReviewsProps, {}> {
    render() {
        const {model} = this.props;
        if (!model.selectedWc) return <span>Zvolte toaletu pro více informací</span>
        return (
            <div>
                <h2>Recenze</h2>
                <span>{"Jméno:" + model.selectedWc.name}</span>
                <span>{"Cena:" + model.selectedWc.price}</span>
                <span>{"Počet toalet:" + model.selectedWc.toiletCount}</span>
                <span>{"Naposledy uklizeno:" + model.selectedWc.lastCleaned}</span>
                <Rating
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
        );
    }
}