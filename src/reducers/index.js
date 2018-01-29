import { combineReducers } from 'redux'

import * as ActionTypes from '../actions'
import { entities } from './entities'
import { lists } from './lists'

function selectedRoutes(state = '', action) {
    const { type, payload } = action

    switch (type) {
        case ActionTypes.ACTION_TYPE_UPDATE_SELECTED_ROUTES: {
            return payload
        }
        default: {
            return state
        }
    }
}

export default combineReducers({
    entities, lists, selectedRoutes
})