import React from "react";
import {Route} from "react-router-dom";

const ViewProductsCard = (props) => {

    return props.arr.map((item, index) => {
        console.log(item, index)
        return         <Route key={index} path={`/${index +1}`} exact component={item}/>

    })
};

export default ViewProductsCard;