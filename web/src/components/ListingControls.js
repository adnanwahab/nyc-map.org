import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { RadioButton, Button, Box, Text } from 'grommet'

import Slider, { SliderTooltip } from 'rc-slider'
import 'rc-slider/assets/index.css'
import GL from '@luma.gl/constants'

import { IconLayer } from '@deck.gl/layers'
import VisualizationControls from 'src/components/VisualizationControls'

import IconClusterLayer from 'src/components/icon-cluster-layer'
import {
    ScatterplotLayer,
    GeoJsonLayer,
    LineLayer,
    HexagonLayer,
} from 'deck.gl'

const makeIconLayer = (data) => {
    const iconMapping = '/location-icon-mapping.json',
        iconAtlas = '/location-icon-atlas.png'
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
        // iconAtlas: '/location-icon-atlas.png',
        // iconMapping: {
        //   "x": 384,
        //   "y": 512,
        //   "width": 128,
        //   "height": 128,
        //   "anchorY": 128
        // },
        // getIcon: {
        //   url: '/icon-marker.png',
        //   width: 512,
        //   height: 512,
        //   anchorY: 0
        // },
        //onHover: d => { d.picked && console.log(d.object) }
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

const wrapperStyle = { width: 250 }

const makeNameGood = (str) => {
    return str.replace('_', ' ')
}

const Link = styled.a`
    text-decoration: none;
    color: #323232;
`

const List = styled.section`
    background: transparent;
    border-radius: 3px;
    margin: 0 1em;
    padding: 0.25em 1em;
`
// The above changes the color for the legend.
const SidePanel = styled.section`
    line-height: 21px;
    font-size: 16px;
    padding: 0px;
    font-size: 10px;
    position: fixed;
    left: 25px;
    bottom: 36px;
    z-index: 1100;
    background: white;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.2);
    font-weight: 500;
    color: black;

    height: 250px;
    width: 350px;
    overflow: scroll;
`
const SubHeader = styled.section`
    padding: 0px 1.5rem;
    border-color: rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #333;
    border-color: rgba(0, 0, 0, 0.1);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    font-weight: 600;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const Logo = styled.img`
    padding-right: 10px;
    display: inline;
`

const Label = styled.label`
    display: block;
`

const LinkTitle = styled.h1`
    display: inline;
    font-size: 16px;
`

const PriceInput = styled.input`
    width: 50px;
`

const RangeSelector = () => {
    return (
        <div>
            <div style={wrapperStyle}>
                <Range
                    min={0}
                    max={3000}
                    step={100}
                    defaultValue={[0, 2000]}
                    tipFormatter={(value) => `$${value}`}
                />
            </div>
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
        <SidePanel>
            {favorites}
            <SubHeader>
                <Logo src="/favicon.png" />
                <Text size="large">Crib Finder </Text> <br />
                <Text size="xsmall">Data Driven Appartment Hunting</Text>
            </SubHeader>
            <Box direction="row" align="center" pad="small" gap="small">
                <Text size="small" color="brand">
                    Type
                </Text>
                <form
                    onChange={(e) => {
                        console.log(e.target.value, e.target.name)
                        setChecked(e.target.name)
                    }}
                >
                    {radio}
                </form>
            </Box>

            <Box direction="row" align="center" pad="small" gap="small">
                <Text size="small" color="brand">
                    Price
                </Text>

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
            </Box>
            {/*
      <Box size='small' direction='row' align='center' pad='medium' gap='small'>
        <button onClick={()=> setShowModal(! showModal)} className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
          Get Email Alerts about this Search
        </button>
        {showModal ? emailModal()
          : null}
      </Box> */}
        </SidePanel>
    )
}

export default ListingControls
