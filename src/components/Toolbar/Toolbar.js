import React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import get from 'lodash/get'

import './Toolbar.css'
import { fetchRoutes, updateSelectedRoutes } from '../../actions'

export const Toolbar = connect(state => {
    const list = get(state, 'lists.routes.items', [])
    const isLoadingRoutesDropdownOptions = get(state, 'lists.routes.isLoading', false)
    const routesDropdownOptions = list.map(tag => {
        const entity = get(state, ['entities', 'routes', tag], {})
        return {
            value: tag,
            label: entity.title
        }
    })
    const selectedRoutes = get(state, 'selectedRoutes', '')

    return {
        routesDropdownOptions,
        isLoadingRoutesDropdownOptions,
        selectedRoutes
    }
})(
    class Toolbar extends React.Component {
        componentDidMount() {
            const { dispatch } = this.props
            dispatch(fetchRoutes())
        }
        handleChangeFilterRoutes = value => {
            const { dispatch } = this.props
            dispatch(updateSelectedRoutes(value))
        }
        render() {
            const {
                routesDropdownOptions,
                isLoadingRoutesDropdownOptions,
                selectedRoutes
            } = this.props

            return (
                <div className="Toolbar">
                    <div className="Toolbar--container">
                        <h1>SF Muni</h1>
                        <p>A Real-Time SF Muni Visualization</p>
                        
                        <label>Filters (by routes)</label>
                        <Select
                            name="filterRoutes"
                            value={selectedRoutes}
                            multi
                            joinValues
                            isLoading={isLoadingRoutesDropdownOptions}
                            onChange={this.handleChangeFilterRoutes}
                            options={routesDropdownOptions}/>
                    </div>
                </div>
            )
        }
    }
)