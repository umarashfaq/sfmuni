import { combineReducers } from 'redux'

import { routes } from './routes'
import { vehicles } from './vehicles'

export const entities = combineReducers({
    routes, vehicles
})