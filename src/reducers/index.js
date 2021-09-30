const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0,
    quantity: 0
}

const reducer = (state=initialState, actions) => {
    switch (actions.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: actions.payload,
                loading: false,
                error: false
            };

        case 'MENU_REQUESTED':
            return {
                ...state,
                // menu: state.menu,
                loading: true,
                error: false
            };

        case 'MENU_ERROR':
            return {
                ...state,
                // menu: state.menu,
                // loading: state.loading,
                error: true
            };

        case 'ITEM_ADD_TO_CARD':
            const addId = actions.payload,
                addItem = state.menu[addId -1];
                // item = state.menu.find(item => item.id === thisId);

            const itemInd = state.items.findIndex(item => item.id === addId);
            if (itemInd >= 0){
                const itemInState = state.items.find(item => item.id === addId);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }

            }

            const newItem = {
                title: addItem.title,
                price: addItem.price,
                url: addItem.url,
                category: addItem.category,
                id: addItem.id,
                qtty: 1
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    newItem,
                ],
                totalPrice: state.totalPrice + newItem.price

            };

            // case 'ITEM_ADD_TO_CARD':
            // const addId = actions.payload,
            //     addItem = state.menu[addId -1];
            //     // item = state.menu.find(item => item.id === thisId);
            //
            // const newItem = {
            //     title: addItem.title,
            //     price: addItem.price,
            //     url: addItem.url,
            //     category: addItem.category,
            //     id: addItem.id
            // }
            //
            // return {
            //     ...state,
            //     items: [
            //         ...state.items,
            //         newItem,
            //     ],
            //     quantity: state.quantity + 10
            //
            // };

        case 'ITEM_REMOVE_FROM _CARD':
            const arrWithout = [],
                removeId = actions.payload;

            const itemIndex = state.items.findIndex(item => item.id === removeId)
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];


            state.items.forEach(item => {
                if (item.id !== removeId) arrWithout.push(item)
            })

            return {
                ...state,
                items: arrWithout,
                totalPrice: state.totalPrice - price
            };

        default: return state;
    }
};

export default reducer;