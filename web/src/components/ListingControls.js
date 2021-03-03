import React, { useEffect, useState } from 'react'

import Slider, { SliderTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
import GL from '@luma.gl/constants'

import { IconLayer } from '@deck.gl/layers'

import IconClusterLayer from 'src/components/icon-cluster-layer'
import { ScatterplotLayer } from 'deck.gl'

// import { Slider } from "@blueprintjs/core";

const makeIconLayer = (data) => {
    const layerProps = {
        data,
        pickable: true,
        getPosition: (d) => [+d.longitude, +d.latitude],
        getIcon: (d) => 'marker',
        iconMapping: '/location-icon-mapping.json',
        iconAtlas: '/location-icon-atlas.png',
        sizeUnits: 'pixels',

        sizeScale: 0.1,
        sizeMinPixels: 20,
        sizeMaxPixels: 50,
        getColor: () => [255, 0, 255, 255],
    }

    return new IconClusterLayer({
        ...layerProps,
        id: 'icon-cluster',
        sizeScale: 60,
    })

    return new IconLayer({
        ...layerProps,
        id: 'icon',
        getIcon: (d) => 'marker',
        sizeUnits: 'meters',
        sizeScale: 2000,
        sizeMinPixels: 6,
    })
}

const makeScatterLayer = (data) => {
    return new ScatterplotLayer({
        id: 'places',
        getFillColor: (d) => {
            return [100, 0.5, 100, 255]
        },
        getPosition: (d) => [+d.longitude, +d.latitude],

        radiusScale: 10,
        getRadius: 10,
        data: data,
        stroke: false,
        parameters: {
            // prevent flicker from z-fighting
            [GL.DEPTH_TEST]: true,

            // turn on additive blending to make them look more glowy
            [GL.BLEND]: true,
            [GL.BLEND_SRC_RGB]: GL.ONE,
            [GL.BLEND_DST_RGB]: GL.ONE,
            [GL.BLEND_EQUATION]: GL.FUNC_ADD,
        },
    })
}

const queryMongo = async (search) => {
    const query = {}
    const res = await fetch('http://localhost:8911/listings', {
        method: 'POST',
        body: JSON.stringify(query),
    })
    const rest = await res.json()
    console.log(rest)
    return rest
}

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)
const { Handle } = Slider

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props
    return (
        <SliderTooltip
            prefixCls="rc-slider-tooltip"
            overlay={`${value} %`}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    )
}

const wrapperStyle = { width: 150 }

const makeNameGood = (str) => {
    return str.replace('_', ' ')
}

const emailModal = () => (
    <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"

            //onClick={() => setShowModal(false)}
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <form
                        class="m-4 flex"
                        onSubmit={() => {
                            console.log('submit')
                        }}
                    >
                        <input
                            class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                            placeholder="your@mail.com"
                        />
                        <button class="px-8 rounded-r-lg bg-purple-400  text-gray-800 font-bold p-4 uppercase border-purple-500 border-t border-b border-r">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <div
            onClick={() => setShowModal(false)}
            className="opacity-25 fixed inset-0 z-40 bg-black"
        ></div>
    </>
)

const RangeSelector = () => {
    return (
        <div className="inline" style={wrapperStyle}>
                <Range
                    min={0}
                    max={3000}
                    step={100}
                    defaultValue={[0, 2000]}
                    tipFormatter={(value) => `$${value}`}
                />
        </div>
    )
}

const ListingControls = (props) => {
    const [checked, setChecked] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const call = async () => {
            if (! checked) return
            const data = await queryMongo({})
            const layer = makeIconLayer(data)
            props.selectListings(layer)
        }
        call()
    }, [checked])

    const onChange = (e) => {
        setChecked(e.target.checked)
    }


    localStorage.setItem('favorites', [])

    let favorites = (
        <div className=" mt-2 flex items-center text-sm text-gray-500">
            favorites:{' '}
        </div>
    )

    let radio = ['rentals', 'airbnb', 'condo', 'officespace'].map((d) => (
        <label key={d}>
            <input
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                name={d}
                type="radio"
                readOnly
                checked={checked == d}
            />{' '}
            {d}
        </label>
    ))
    return (
        <div className="p-5 bottom-10 left-10 absolute bg-white shadow h-60 w-96 text-black z-50">
            {/* {favorites} */}
            <div>
                <img className="inline" src="/favicon.png" />
                <span className="text-md">Crib Finder </span>
                <span className="text-xs">Data Driven Appartment Hunting</span>
            </div>
            <div className="text-xs" direction="row" align="center" pad="small" gap="small">
                <span size="small" color="brand" className="">
                    Type
                </span>
                <form className="inline"
                    onChange={(e) => {
                        console.log(e.target.value, e.target.name)
                        setChecked(e.target.name)
                    }}
                >
                    {radio}
                </form>
            </div>

            <div direction="row" align="center" pad="small" gap="small">
                <span size="small" color="brand">
                    Price
                </span>

                <RangeSelector
                    direction="horizontal"
                    invert={false}
                    min={0}
                    max={1000}
                    size="medium"
                    round="small"
                    values={priceRange}
                    onChange={(nextValues) => setPriceRange(nextValues)}
                />
            </div>
        </div>
    )
}

export default ListingControls
