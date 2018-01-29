import React from 'react'
import { connect } from 'react-redux'
import { select, geoEquirectangular, geoPath, geoCentroid, json, interval } from 'd3'
import debounce from 'lodash/debounce'
import get from 'lodash/get'

import './Visualization.css'
import neighborhoods from '../../data/neighborhoods.json'
import streets from '../../data/streets.json'
import freeways from '../../data/freeways.json'
import arteries from '../../data/arteries.json'
import { chartMap, chartVehicles, chartMain } from '../../d3'
import { hasPropChanged } from '../../utils'
import { startFetchingVehicleLocations, stopFetchingVehicleLocations } from '../../actions'

export const Visualization = connect(state => {
    const selectedRoutes = get(state, 'selectedRoutes', '')
    const vehicles = get(state, 'entities.vehicles', {})

    return { selectedRoutes, vehicles }
})(
    class Visualization extends React.Component {
        constructor(props) {
            super(props)
            this.handleResize = debounce(this.handleResize, 200)
        }
        componentDidMount() {
            const { dispatch } = this.props
            dispatch(startFetchingVehicleLocations())

            window.addEventListener('resize', this.handleResize)
            this.createD3Visualization()
        }
        componentWillUnmount() {
            const { dispatch } = this.props
            dispatch(stopFetchingVehicleLocations())

            window.removeEventListener('resize', this.handleResize)
        }
        shouldComponentUpdate(nextProps) {
            return false
        }
        componentDidUpdate() {
            console.log(`[Visualzation/componentDidUpdate] Invoked`)
            this.createD3Visualization()
        }
        componentWillReceiveProps(nextProps) {
            console.log(`[Visualzation/componentWillReceiveProps] Invoked: `, nextProps)

            if ( hasPropChanged('selectedRoutes', this.props, nextProps) || hasPropChanged('vehicles', this.props, nextProps) ) {
                this.updateVehiclesList( nextProps )
            }
        }
        updateVehiclesList(nextProps) {
            const { vehicles, selectedRoutes } = nextProps
            let vehiclesList = Object.values(vehicles)
            
            if ( selectedRoutes.length) {
                const selectedRouteTags = selectedRoutes.map(item => item.value)
                vehiclesList = vehiclesList.filter(vehicle => selectedRouteTags.indexOf(vehicle.routeTag) > -1)
            }
            // console.log(`[Visualzation/componentWillReceiveProps] vehiclesList: `, vehiclesList)

            this.d3Visualization.vehicles( vehiclesList )
        }
        handleResize = () => {
            const { width, height } = this.node.getBoundingClientRect()
            this.d3Visualization.size([ width, height ])
        }
        createD3Visualization = () => {
            const { width, height } = this.node.getBoundingClientRect()
            this.d3Visualization = chartMain({
                size: [ width, height ],
                neighborhoods,
                arteries,
                streets,
                freeways,
                vehicles: {}
            })

            select(this.node)
                .call(this.d3Visualization)
        }
        render() {
            return (
                <div className="Visualization">
                    <svg ref={node => this.node = node} width="100%" height="100%">
                    </svg>
                </div>
            )
        }
    }
)