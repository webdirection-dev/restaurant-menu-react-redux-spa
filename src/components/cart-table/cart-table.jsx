import React from 'react';
import './cart-table.scss';
import {connect} from "react-redux";
import {deleteFromCard} from "../../actions";
import WithRestoService from '../hoc';
// import MenuListItem from "../menu-list-item";

const CartTable = ({arr, deleteFromCard, RestoService}) => {

    if (arr.length !== 0) {
        return <WithOrder arr={arr} deleteFromCard={deleteFromCard} RestoService={RestoService}/>
    }

    return WithoutOrders();

};

const WithOrder = ({arr, deleteFromCard, RestoService}) => {
    return(
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {
                    arr.map(item => {
                        const {title, price, url, id, qtty} = item;

                        return(
                            <div key={id} className="cart__item">
                                <img src={url} className="cart__item-img" alt={title}></img>
                                <div className="cart__item-title">{title}</div>
                                <div className="cart__item-price">{price}$</div>
                                <div onClick={() => deleteFromCard(id)} className="cart__close">&times;</div>
                                <div className='cart__order'>
                                    <div className='cart__quantity'>{qtty}</div>
                                    <div className='cart__quantity cart__counter'>{price * qtty}$</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button onClick = {() => {RestoService.setOrder( generateOrder(arr))} } className = "cart__btn-order">Оформить заказ</button>
        </>
    )
};

const WithoutOrders = () => {
    return(
        <div className="cart__title">Корзина пуста :(</div>
    )
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

const mapStateToProps = ({items}) => {
    return {
        arr: items
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