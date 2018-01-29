import * as ActionTypes from '../../actions'

export function vehicles(state = {}, action) {
    const { type, payload } = action

    switch( type ) {
        case ActionTypes.ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_SUCCESS: {
            const newEntities = payload.vehicle.reduce((hash, entity) => {
                hash[entity.id] = entity
                return hash
            }, {})

            return {
            //    ...state,
                ...newEntities
            }
        }
        default: {
            return state
        }
    }
}