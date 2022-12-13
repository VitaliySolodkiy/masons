const FavoritesReducer = (state, action) => {

    switch (action.type) {

        case 'addFavorite':
            const findProduct = state.favorites.find(item => item.id === action.product.id);
            //state.favorites - то что находится в корзине
            //action - то что приходит в корзину
            if (findProduct) {
                // console.log("find product: ", findProduct)
                // findProduct.properties.amount += Number(action.product.properties.amount);
                const products = state.favorites.filter(item => { return ((item.properties.size !== findProduct.properties.size) || (item.properties.color !== findProduct.properties.color) || (item.id !== findProduct.id)) });
                // console.log('products: ', products)
                return {
                    favorites: [
                        ...products
                    ]
                }
            }
            const newCartProduct = _.cloneDeep(action.product);
            return {
                favorites: [
                    ...state.favorites,
                    newCartProduct
                ]

            }
        case 'removeFavorite':
            return { favorites: state.favorites.filter(item => (item.properties.size !== action.product.properties.size) || (item.properties.color !== action.product.properties.color) || (item.id !== action.product.id)) };


        case 'clearFavorite':
            return { favorites: [] };
        default:
            return state.favorites
    }
}

export default FavoritesReducer;