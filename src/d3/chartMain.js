import { select, geoEquirectangular, geoPath, interval, json, dispatch } from 'd3'

import { createD3Chart } from './createD3Chart'
import { chartMap } from './chartMap'
import { chartVehicles } from './chartVehicles'

let projection
let geoGen
let chartMapNeighborhoods
let chartMapStreets
let chartMapArteries
let chartMapFreeways
let chartVehiclesInstance

const dispatchVehiclesData = dispatch('data')

/*
function setupVehiclesDataTimer() {
    let lastTimestamp = 0
    // lastTimestamp = d.lastTime.time

    const fetchData = () => 
        json(
            `http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=${lastTimestamp}`,
            d => {
                // console.log(`[setupVehiclesDataTimer/fetchData] data: `, d)
                dispatchVehiclesData.call('data', null, d)
            }
        )

    interval(fetchData, 15000)
    fetchData()
}
*/

function init( config ) {
    projection = geoEquirectangular().fitSize(config('size'), config('neighborhoods'))
    geoGen = geoPath().projection(projection)

    chartMapNeighborhoods = chartMap({
        stroke: '#999',
        generator: geoGen
    })
    
    chartMapStreets = chartMap({
        stroke: '#ddd',
        generator: geoGen
    })
    
    chartMapArteries = chartMap({
        stroke: '#707',
        fill: '#707',
        generator: geoGen
    })
    
    chartMapFreeways = chartMap({
        stroke: '#f00',
        fill: '#f00',
        generator: geoGen
    })

    chartVehiclesInstance = chartVehicles({
        projection
    })
    
    // setupVehiclesDataTimer()
}

function build( selection, config ) {
    // console.log('mapChart')
    selection.each(function(d, i){
        const node = this
        
        select(node)
            .append('g')
            .classed('neighborhoods', true)
            .datum(config('neighborhoods'))
            .call(chartMapNeighborhoods)

        select(node)
            .append('g')
            .classed('streets', true)
            .datum(config('streets'))
            .call(chartMapStreets)

        select(node)
            .append('g')
            .classed('arteries', true)
            .datum(config('arteries'))
            .call(chartMapArteries)

        select(node)
            .append('g')
            .classed('freeways', true)
            .datum(config('freeways'))
            .call(chartMapFreeways)

        const vehicles = select(node)
            .append('g')
            .classed('vehicles', true)

        dispatchVehiclesData.on('data', d => {
            console.log(`[chartMain/build] updating vehicles bound data: `, d)

            vehicles
                .datum(d)
                .call(chartVehiclesInstance)
        })
    })
}

function onChangeConfig( key, selection, config ) {
    switch( key ) {
        case 'size': {
            // console.log(`[chartMain/onChangeConfig] updating size: `, config(key))

            projection.fitSize(config('size'), config('neighborhoods'))
            geoGen.projection( projection )

            ;[
                chartMapNeighborhoods,
                chartMapStreets,
                chartMapFreeways,
                chartMapArteries
            ].forEach(chart => chart.generator( geoGen ))

            chartVehiclesInstance.projection( projection )
            
            break
        }
        case 'vehicles': {
            dispatchVehiclesData.call('data', null, config('vehicles'))

            break
        }
        default: {}
    }
}

function destroy() {
    // unsetVehicleLocationTimer()
}

export const chartMain = createD3Chart({
    defaultConfig: {
        size: null,
        neighborhoods: null,
        streets: null,
        freeways: null,
        arteries: null,
        vehicles: null,
    },
    init,
    build,
    onChangeConfig,
    destroy
})
