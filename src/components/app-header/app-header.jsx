import React from 'react';
import cartIcon from './shopping-cart-solid.svg';
import './app-header.scss';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';

const AppHeader = ({total, totalPrice}) => {
    return (
        <header className="header">
            <Link className="header__link" to="/">
                Menu
            </Link>
            <Link className="header__link" to="/card">
                <img className="header__cart" src={cartIcon} alt="cart"></img>
                Total: {totalPrice} $
            </Link>
        </header>
    )
};

const mapStateToProps = ({totalPrice}) => {
    return{
        totalPrice
    }
}

export default connect(mapStateToProps)(AppHeader);
// export default AppHeader;