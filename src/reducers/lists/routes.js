import { combineReducers } from 'redux'

import * as ActionTypes from '../../actions'

function items(state = [], action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.ACTION_TYPE_FETCH_ROUTES_SUCCESS: {
            return payload.route.map(r => r.tag)
        }
        default: {
            return state
        }
    }
}

function isLoading(state = false, action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.ACTION_TYPE_FETCH_ROUTES: {
            return true
        }
        case ActionTypes.ACTION_TYPE_FETCH_ROUTES_SUCCESS:
        case ActionTypes.ACTION_TYPE_FETCH_ROUTES_FAILURE: {
            return false
        }
        default: {
            return state
        }
    }
}

export const routes = combineReducers({
    items, isLoading
})