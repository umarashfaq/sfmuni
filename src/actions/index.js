export * from './lists'
export * from './entities'

export const ACTION_TYPE_UPDATE_SELECTED_ROUTES = 'ACTION_TYPE_UPDATE_SELECTED_ROUTES'

export function updateSelectedRoutes( payload ) {
    return {
        type: ACTION_TYPE_UPDATE_SELECTED_ROUTES,
        payload
    }
}