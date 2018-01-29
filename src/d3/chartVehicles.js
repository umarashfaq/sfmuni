import { select, transition } from 'd3'
import 'd3-selection-multi'

import { createD3Chart } from './createD3Chart'

const BUS_WIDTH = 10
const BUS_HEIGHT = 16

const t = transition()
        .duration(750)

const buildPositionAttributes = (config, d) => {
    const [ x, y ] = config('projection')([d.lon, d.lat])
    const cx = x - BUS_WIDTH / 2
    const cy = y - BUS_HEIGHT / 2
    const transform = `rotate(${+d.heading} ${cx} ${cy})`

    return { x, y, transform }
}

function build( selection, config ) {
    if ( !config('projection') ) {
        throw new Error(`A 'projection' is required for rendering mapVehicles`)
    }

    // console.log('mapChart')
    selection.each(function(d, i){
        // generate chart here; `d` is the data and `this` is the element
        // console.log(`building vehicles with data: `, d)
        // console.log(`building chartVehicles: `, this)

        const node = select(this)
            .selectAll('rect')
            .data(d, v => v.id)

        node.enter()
            .append('rect')
        //    .on('mouseenter', highlightNeighborhood)
        //    .on('mouseleave', resetNeighborhood)
            .merge(node)
        // .transition(t)
            .attrs(d => buildPositionAttributes(config, d))
            .attr('stroke', d => +d.speedKmHr > 0 ? config('stroke') : '#000')
            .attr('width', BUS_WIDTH)
            .attr('height', BUS_HEIGHT)
            // .attr('stroke', __config__.stroke)
            .attr('stroke-width', '1px')
            .attr('fill', config('fill'))

        node.exit()
        // .transition(t)
            .style("fill-opacity", 1e-6)
            .remove()
    })
}

function onChangeConfig( key, selection, config ) {
    switch( key ) {
        case 'projection': {
            // console.log(`[chartVehicles/onChangeConfig] updating projection: `, config(key))

            selection.each(function(d){
                select(this)
                    .selectAll('rect')
                    .attrs(d => buildPositionAttributes(config, d))
            })
        }
        default: {}
    }
}

export const chartVehicles = createD3Chart({
    defaultConfig: {
        stroke: '#f00',
        fill: 'transparent',
        projection: null
    },
    build,
    onChangeConfig
})