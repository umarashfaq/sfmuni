/**
 * This function creates a D3 chart builder based on the input `options`.
 * The external API of produced chart is same as suggested by Mike Bostocks:
 * https://bost.ocks.org/mike/chart/
 * 
 * Internally this chart builder provides some lifecycle hooks to chart developer.
 * 
 * @param {*} options 
 */
export function createD3Chart( options = {} ) {
    const {
        /**
         * Default configuations for this chart. Each of configuration supplied here
         * will have a `getter/setter` assigned to the `build` function.
         */
        defaultConfig = {},

        /**
         * Invoked only once when the chart is initialized with initialConfig.
         */
        init,

        /**
         * Invoked when a chart is applied on a selection. Its external API is exactly
         * same as Mike's build.
         */
        build,

        /**
         * Invoked when a `config` is changed by a setter method.
         * Useful when you'd like to make smaller modifications in response,
         * instead of repainting the entire chart.
         */
        onChangeConfig,
    } = options

    // init is optional
    if ( init && typeof init !== 'function' ) {
        throw new Error(`expected 'init' to be a function, found: ${build}`)
    }

    if ( typeof build !== 'function' ) {
        throw new Error(`expected 'build' to be a function, found: ${build}`)
    }

    // onChangeConfig is optional
    if ( onChangeConfig && typeof onChangeConfig !== 'function' ) {
        throw new Error(`expected 'onChangeConfig' to be a function, found: ${build}`)
    }

    return function __chart__( initialConfig = {} ) {
        const config = {
            ...defaultConfig,
            ...initialConfig
        }

        const configGetter = key => config[key]
        const buildSelections = new Set()

        function __build__( selection ) {
            buildSelections.add( selection )
            // console.log(`[createD3Chart/__build__] buildSelections: `, buildSelections.size)

            build( selection, configGetter )
        }

        Object
            .keys(config)
            .forEach(key => {
                __build__[key] = function( value ) {
                    if ( !arguments.length ) {
                        return config[key]
                    }

                    config[key] = value
                    
                    if ( onChangeConfig ) {
                        buildSelections.forEach(selection => onChangeConfig(key, selection, configGetter))
                    }
                    
                    return __build__
                }
            })
        
        if ( init ) {
            init( configGetter )
        }

        return __build__
    }
}