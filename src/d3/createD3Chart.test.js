import { createD3Chart } from './createD3Chart'

describe('d3/createD3Chart', () => {
    it('exists', () => {
        expect(createD3Chart).toBeDefined()
    })

    it('is a function', () => {
        expect(createD3Chart).toBeInstanceOf(Function)
    })

    it('cannot be invoked without providing `build` function', () => {
        expect(() => createD3Chart()).toThrow()
    })

    it('can be invoked with providing `build` function', () => {
        expect(() => createD3Chart({
            build: () => {}
        })).not.toThrow()
    })

    it('returns a function', () => {
        const chart = createD3Chart({
            build: jest.fn()
        })

        expect(chart).toBeInstanceOf(Function)
    })

    it('invokes supplied build function correctly when generated chart is applied on a selection', () => {
        const build = jest.fn()
        const chart = createD3Chart({
            build
        })
        const selection = 'This is a dummy selection'

        chart()(selection)

        expect(build).toHaveBeenCalled()
        expect(build.mock.calls[0][0]).toBe(selection)
    })

    it('automatically generates getter/setters on produced chart', () => {
        const chart = createD3Chart({
            defaultConfig: {
                width: 500
            },
            build: jest.fn()
        })

        const build = chart()

        expect(build.width).toBeInstanceOf(Function)
        expect(build.width()).toBe(500)
        expect(build.width(1000)).toBe(build)
        expect(build.width()).toBe(1000)
    })

    it('invoked onChangeConfig correctly when a config is changed', () => {
        const onChangeConfig = jest.fn()
        const chart = createD3Chart({
            defaultConfig: {
                width: 500
            },
            build: jest.fn(),
            onChangeConfig
        })

        const build = chart()
        build('Test Selection 1')
        build('Test Selection 2')
        build('Test Selection 3')
        build.width(1000)

        expect(onChangeConfig).toHaveBeenCalled()
        expect(onChangeConfig.mock.calls.length).toBe(3)
        expect(onChangeConfig.mock.calls[0][0]).toBe('width')
    })
})