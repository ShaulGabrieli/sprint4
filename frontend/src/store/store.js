import { createStore, combineReducers } from 'redux'

import { gigReducer } from './gig.reducer.js'
import { userReducer } from './user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'
import { orderReducer } from './order.reducer'
import { filterReducer } from './filter.reducer.js'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
    orderModule: orderReducer,
    filterModule: filterReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



