import React from "react";
import GetProduct from "../technical/getProduct";

const GreeceSalad = (props) => {
    const cardNumber = props.location.pathname.replace('/', '');

    return(
        <GetProduct productCard={Number(cardNumber)}/>
    )
};

export default GreeceSalad;