import * as ActionTypes from '../../actions'

export function routes(state = {}, action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.ACTION_TYPE_FETCH_ROUTES_SUCCESS: {
            const newEntities = payload.route.reduce((hash, entity) => {
                hash[entity.tag] = entity
                return hash
            }, {})

            return {
                ...state,
                ...newEntities
            }
        }
        default: {
            return state
        }
    }
}