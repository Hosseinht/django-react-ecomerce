import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";


export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        // Check if the product that we send back inside of action payload exist in cartItems array. if exist we don't want to add it again we just
        // need to change the quantity. if we don't have we get it fro action.payload and add it to cartItems array.
        case CART_ADD_ITEM:
            const item = action.payload
            // paylaod will be the product
            const existItem = state.cartItems.find(x => x.idProduct === item.idProduct)
            // product is product id. it's in the cartAction. if it find something it will return back an object if it doesn't it's going to return nothing
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.idProduct === existItem.idProduct ? item : x)
                    // loop through the cartItems.If the product exist we replace it with the new item if it doesn't we just return x(original product)
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
                // It keeps all the products that doesn't match with action.payload id
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
