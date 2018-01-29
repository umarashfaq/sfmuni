import { select } from 'd3'
import { createD3Chart } from './createD3Chart'

function build( selection, config ) {
    selection.each(function(d){
        // generate chart here; `d` is the data and `this` is the element
        // console.log(`building chart with data: `, d)

        const node = select(this)
            .selectAll('g.neighborhood')
            .data(d.features)

        node.enter()
            .append('g')
            .classed('neighborhood', true)
        //    .on('mouseenter', highlightNeighborhood)
        //    .on('mouseleave', resetNeighborhood)
            .append('path')
            .attr('d', config('generator'))
            .attr('stroke', config('stroke'))
            .attr('stroke-width', '1px')
            .attr('fill', 'transparent')

        node.exit()
            .remove()

    })
}

function onChangeConfig( key, selection, config ) {
    switch( key ) {
        case 'generator': {
            // console.log(`[chartMap2/onChangeConfig] updating generator: `, config(key))

            selection.each(function(d){
                select(this)
                    .selectAll('g.neighborhood')
                    .select('path')
                    .attr('d', config(key))
            })
        }
        default: {}
    }
}

function destroy( selection, config ) {
    selection.each(function() {
        select(this)
            .selectAll('g.neighborhood')
            .remove()
    })
}

export const chartMap = createD3Chart({
    defaultConfig: {
        generator: null,
        stroke: '#f00'
    },
    build,
    onChangeConfig,
    destroy
})