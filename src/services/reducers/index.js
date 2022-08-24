import { combineReducers } from 'redux'
import { cartReducer } from './cart'
import { NEXT_STEP, PREVIOUS_STEP } from '../actions'
console.log((NEXT_STEP, PREVIOUS_STEP))
const stepReducer = (state = 'cart', action) => {
    console.log(action.type)
    switch (action.type) {
        case NEXT_STEP: {
            return state === 'cart'
                ? 'delivery'
                : state === 'delivery'
                ? 'checkout'
                : state === 'checkout'
                ? 'checkout'
                : 'checkout'
        }
        // опишите шаг PREV_STEP
        case PREVIOUS_STEP: {
            return state === 'cart'
                ? 'cart'
                : state === 'delivery'
                ? 'cart'
                : state === 'checkout'
                ? 'delivery'
                : 'carts'
        }

        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    cart: cartReducer,
    step: stepReducer,
})
