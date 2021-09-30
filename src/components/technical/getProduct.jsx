import React, {Component} from 'react';
import '../menu-list-item/menu-list-item.scss'
import WithRestoService from "../hoc";
import {connect} from "react-redux";
import {menuError, menuLoaded, menuRequested} from "../../actions";
import Error from "../error";
import Spinner from "../spinner";

class GetProduct extends Component{
    componentDidMount() {
        const {RestoService, menuLoaded, menuRequested, menuError} = this.props;

        menuRequested();

        RestoService.getMenuItems()
            .then(result => menuLoaded(result))
            .catch(() => menuError())
    }

    render() {
        const {menuItems, loading, error, productCard} = this.props;

        if (error) return <Error />
        if (loading) return <Spinner />

        return (
            <View menuItems={menuItems} productCard={productCard}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        menuLoaded: (newMenu) => {
            dispatch(menuLoaded(newMenu));
        },
        menuRequested: () => {
            dispatch(menuRequested());
        },
        menuError: () => {
            dispatch(menuError());
        },
    }
};

const View = ({menuItems, productCard}) => {

    return(
        <ul className="menu__list">
            {
                menuItems.map(item => {
                    if (item.id === productCard) {
                        return (
                            <li className="menu__item" key={item.id}>
                                <div className='menu__title'>{item.title}</div>
                                <img className="menu__img" src={item.url} alt={item.title}></img>
                                <div className="menu__category">Category: <span>{item.category}</span></div>
                                <div className="menu__price">Price: <span>{item.price}$</span></div>
                                <button className="menu__btn">Add to cart</button>
                            </li>
                        )
                    }
                    else return null;
                })
            }
        </ul>
    )
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(GetProduct));