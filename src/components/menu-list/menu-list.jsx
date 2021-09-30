import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from "react-redux";
import WithRestoService from "../hoc";
import {menuLoaded, menuRequested, menuError, addedToCard} from "../../actions";
import Spinner from "../spinner";
import Error from "../error";
import './menu-list.scss';

class MenuList extends Component {

    componentDidMount() {
        const {RestoService, menuLoaded, menuRequested, menuError} = this.props;

        menuRequested();

        // Для работы с локальным объектом
        const localDB = RestoService.getDataDB();
        menuLoaded(localDB.menu)

        // Для работы с сервером
        // RestoService.getMenuItems()
        //     .then(result => menuLoaded(result))
        //     .catch(() => menuError())
    }

    render() {
        const {menuItems, loading, error, addedToCard} = this.props;

        if (error) return <Error />
        if (loading) return <Spinner />

        return (
            <View menuItems={menuItems} addedToCard={addedToCard}/>
        )
    }
}

// настройка функции высшего порядка connect()
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
        addedToCard: (id) => {
            dispatch(addedToCard(id))
        }
    }
};

const View = ({menuItems, addedToCard}) => {
    return(
        <ul className="menu__list">
            {
                menuItems.map(item => {
                    return <MenuListItem
                        key={item.id}
                        item={item}
                        onAddToCard={() => addedToCard(item.id)}/>
                })
            }
        </ul>
    )
};

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));


// class MenuList extends Component {
//
//     componentDidMount() {
//         const {RestoService, menuLoaded, menuRequested, menuError} = this.props;
//
//         menuRequested();
//
//         RestoService.getMenuItems()
//             .then(result => menuLoaded(result))
//             .catch(() => menuError())
//     }
//
//     render() {
//         const {menuItems, loading, error, addedToCard} = this.props;
//
//         if (error) return <Error />
//         if (loading) return <Spinner />
//
//         return (
//             <View menuItems={menuItems} addedToCard={addedToCard}/>
//         )
//     }
// }
//
// // настройка функции высшего порядка connect()
// const mapStateToProps = (state) => {
//     return {
//         menuItems: state.menu,
//         loading: state.loading,
//         error: state.error
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         menuLoaded: (newMenu) => {
//             dispatch(menuLoaded(newMenu));
//         },
//         menuRequested: () => {
//             dispatch(menuRequested());
//         },
//         menuError: () => {
//             dispatch(menuError());
//         },
//         addedToCard: (id) => {
//             dispatch(addedToCard(id))
//         }
//     }
// };
//
// const View = ({menuItems, addedToCard}) => {
//     return(
//         <ul className="menu__list">
//             {
//                 menuItems.map(item => {
//                     return <MenuListItem
//                         key={item.id}
//                         item={item}
//                         onAddToCard={() => addedToCard(item.id)}/>
//                 })
//             }
//         </ul>
//     )
// };
//
// export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));