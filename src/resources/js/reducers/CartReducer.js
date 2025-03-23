const CartReducer = (state, action) => {

    switch (action.type) {

        case 'addProduct':
            const findProduct = state.cart.find(item => item.id === action.product.id && item.properties.size === action.product.properties.size && item.properties.color === action.product.properties.color); //добавить проверку в т.ч. по размеру и цвету
            //state.cart - то что находится в корзине
            //action - то что приходит в корзину

            if (findProduct) {

                findProduct.properties.amount += Number(action.product.properties.amount);
                const products = state.cart.filter(item => { return ((item.properties.size !== findProduct.properties.size) || (item.properties.color !== findProduct.properties.color) || (item.id !== findProduct.id)) });

                return {
                    cart: [
                        ...products,
                        findProduct
                    ]
                }
            }
            const newCartProduct = _.cloneDeep(action.product);
            return {
                cart: [
                    ...state.cart,
                    newCartProduct
                ]

            }
        case 'removeProduct':
            return { cart: state.cart.filter(item => (item.properties.size !== action.product.properties.size) || (item.properties.color !== action.product.properties.color) || (item.id !== action.product.id)) };

        case 'incrementProduct':
            //здесь лучше делать дип клон через lodash и потом работать с ним. после изменения вовращать его в свойство cart

            return {
                cart: state.cart.map(item => {
                    if (item.id === action.product.id && item.properties.size === action.product.properties.size && item.properties.color === action.product.properties.color) {
                        item.properties.amount += 1;
                        return item;
                    }
                    return item;
                })
            }

        case 'decrementProduct':
            return {
                cart: state.cart.map(item => {
                    if (item.id === action.product.id && item.properties.size === action.product.properties.size && item.properties.color === action.product.properties.color) {
                        item.properties.amount > 1 ? item.properties.amount -= 1 : '';
                        return item;
                    }
                    return item;
                })
            }
        case 'changeProperty':
            // console.log("product: ", action.product, "property: ", action.property, "propertyValue: ", action.propertyValue);
            const productToChange = state.cart.find(item => item.id === action.product.id && item.properties.size === action.product.properties.size && item.properties.color === action.product.properties.color); //добавить проверку в т.ч. по размеру и цвету
            console.log("productToChange before: ", productToChange);
            productToChange.properties[`${action.property}`] = action.propertyValue;
            console.log("productToChange: ", productToChange);
            return {
                cart: [
                    ...state.cart
                ]

            }
        case 'clearCart':
            return { cart: [] };
        default:
            return state.cart
    }
}

export default CartReducer;