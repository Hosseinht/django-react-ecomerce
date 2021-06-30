import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";


export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        // Check if the product that we send back inside of action payload exist in cartItems array
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.idProduct === item.idProduct)
            // product is product id. it's in the cartAction
            if (existItem) {
                return {
                    cartItems: state.cartItems.map(x => x.idProduct === existItem.idProduct ? item : x)
                    // loop through the cartItems
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
                //original state + original cartItems and add new item!
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.idProduct !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }


        default:
            return state
    }
}
