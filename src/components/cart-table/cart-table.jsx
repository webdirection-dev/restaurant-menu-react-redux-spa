import React from 'react';
import './cart-table.scss';
import {connect} from "react-redux";
import {deleteFromCard} from "../../actions";
import WithRestoService from '../hoc';

const CartTable = ({arr, deleteFromCard, quantity, RestoService}) => {

    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    arr.map(item => {
                        const {title, price, url, id, sum=0, qtty} = item;

                        return(
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$ *{qtty}</div>
                                <div onClick={() => deleteFromCard(id)} className="cart__close">&times;</div>
                                <div className='cart__order'>
                                    <div className='cart__quantity'>{quantity}</div>
                                    <div className='cart__quantity cart__counter'>{sum}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick = {() => {RestoService.setOrder( generateOrder(arr))} } className = "order">Оформить заказ</button>
        </>
    );

};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = ({items, quantity}) => {
    return {
        arr: items,
        quantity
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFromCard: (id) => {
            dispatch(deleteFromCard(id));
        },
    }
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
// export default connect(mapStateToProps, mapDispatchToProps)(CartTable);