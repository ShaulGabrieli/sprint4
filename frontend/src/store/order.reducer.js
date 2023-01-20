
export const SET_USER_ORDERS = 'SET_USER_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'

const initialState = {
    order: {},
    userOrders : [],
    lastRemovedOrder: null

}


export function orderReducer(state = initialState, action) {
    var newState = state
    var order
    switch (action.type) {
        case SET_USER_ORDERS:
            newState = { ...state, userOrders: action.orders }
            break
         case REMOVE_ORDER:
            newState = { ...state, order: {} }
            break
        case ADD_ORDER:
            newState = { ...state, order: action.order }
            break
        case SET_CURRENT_ORDER:
            newState = { ...state, order: action.order }
            break
            default:
            }
            return newState
        }

