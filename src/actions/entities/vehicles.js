import axios from 'axios'

export const ACTION_TYPE_FETCH_VEHICLE_LOCATIONS = 'ACTION_TYPE_FETCH_VEHICLE_LOCATIONS'
export const ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_SUCCESS = 'ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_SUCCESS'
export const ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_FAILURE = 'ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_FAILURE'

export function fetchVehicleLocations( agencyTag = 'sf-muni', time = 0 ) {
    return dispatch => {
        dispatch({
            type: ACTION_TYPE_FETCH_VEHICLE_LOCATIONS
        })

        axios.get(`http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=${agencyTag}&t=${time}`)
            .then(response => dispatch({
                type: ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_SUCCESS,
                payload: response.data
            }))
            .catch(payload => dispatch({
                type: ACTION_TYPE_FETCH_VEHICLE_LOCATIONS_FAILURE,
                payload
            }))
    }
}

let intervalID
const POLL_INTERVAL = 15000

export function startFetchingVehicleLocations() {
    return dispatch => {
        if ( intervalID ) {
            console.warn(`Already fetching vehicleLocations`)
            return
        }

        dispatch(fetchVehicleLocations('sf-muni', 0))
        
        setInterval(() => {
            dispatch(fetchVehicleLocations('sf-muni', 0))
        }, POLL_INTERVAL)
    }
}

export function stopFetchingVehicleLocations() {
    return dispatch => {
        if ( !intervalID ) {
            return
        }

        clearInterval(intervalID)
        intervalID = null
    }
}