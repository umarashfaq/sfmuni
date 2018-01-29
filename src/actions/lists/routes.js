import axios from 'axios'

export const ACTION_TYPE_FETCH_ROUTES = 'ACTION_TYPE_FETCH_ROUTES'
export const ACTION_TYPE_FETCH_ROUTES_SUCCESS = 'ACTION_TYPE_FETCH_ROUTES_SUCCESS'
export const ACTION_TYPE_FETCH_ROUTES_FAILURE = 'ACTION_TYPE_FETCH_ROUTES_FAILURE'

export function fetchRoutes(agencyTag = 'sf-muni') {
    return dispatch => {
        dispatch({
            type: ACTION_TYPE_FETCH_ROUTES
        })

        axios.get(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=${agencyTag}`)
            .then(response => dispatch({
                type: ACTION_TYPE_FETCH_ROUTES_SUCCESS,
                payload: response.data
            }))
            .catch(payload => dispatch({
                type: ACTION_TYPE_FETCH_ROUTES_FAILURE,
                payload
            }))
    }
}