import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function user(state = {}, action) {

    switch (action.type) {
        case 'get':
            console.log(action.payload)
            return state = action.payload
        default:
            return state
    }
}

let store = createStore(user, applyMiddleware(thunk))
export default store