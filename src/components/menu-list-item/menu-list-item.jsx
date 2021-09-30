import React from 'react';
import './menu-list-item.scss';
import {Link} from "react-router-dom";

const MenuListItem = ({item, onAddToCard}) => {
    const {title, price, url, category, id} = item;
    let classTitle = `menu__title menu__title-${category}`

    return (
            <li className="menu__item">
                <Link className='menu__link-to-product' to={String(id)}>
                    <div className={classTitle}>{title}</div>
                    <img className="menu__img" src={url} alt={title}></img>
                    <div className="menu__category">Category: <span>{category}</span></div>
                    <div className="menu__price">Price: <span>{price}$</span></div>
                </Link>

                <button
                    onClick={() => onAddToCard()}
                    className="menu__btn"
                >Add to cart</button>
            </li>
    )
}

export default MenuListItem;