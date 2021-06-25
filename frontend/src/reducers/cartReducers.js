import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";


export const cartReducer = (state = {cartItems: []}, action) => {
    switch (action.type) {
        // Check if the product that we send back inside of action payload exist in cartItems array
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            // product is product id. it's in the cartAction
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                    // loop through the cartItems
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
                //original state + original cartItems and add new item!
            }

        default:
            return state
    }
}
