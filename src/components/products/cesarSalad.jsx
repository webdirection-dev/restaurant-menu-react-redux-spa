import React from "react";
import GetProduct from "../technical/getProduct";

class CesarSalad extends React.Component {

    render() {
        const cardNumber = this.props.location.pathname.replace('/', '');

        return(
            <GetProduct productCard={Number(cardNumber)}/>
        )
    }
}

export default CesarSalad;