import React, { useEffect, useState } from 'react'
import GL from '@luma.gl/constants'
import { IconLayer } from '@deck.gl/layers'
import IconClusterLayer from 'src/components/icon-cluster-layer'
import { ScatterplotLayer } from 'deck.gl'

import { RangeSlider } from "@blueprintjs/core";

const LISTING_TYPES = ['Rentals', 'Airbnb', 'Condo', 'Officespace']

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


//localStorage.getItem('favorites')
const FAVE = ['hello', 'yay']
localStorage.setItem('favorites', JSON.stringify(FAVE))
const favorites = FAVE;
const ListingControls = ({selectListings}) => {
    const [checked, setChecked] = useState('Airbnb')
    const [priceRange, setPriceRange] = useState([1500, 2000])

    useEffect(() => {
        const call = async () => {
            if (! checked) return
            const data = await queryMongo({})
            const layer = makeIconLayer(data)
            selectListings(layer)
        }
        call()
    }, [checked])

    let favoriteList = () =>
       ( <div className="mt-2 flex items-center text-sm text-gray-500">
            favorites:
            {favorites.map((d) => <div>{d}</div>)}
        </div>)

    let radio = LISTING_TYPES.map((d) => (
        <label key={d} className="pr-2">
            <input
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded "
                name={d}
                type="radio"
                checked={checked == d}
                onChange={() => {}}
            />{' '}
            {d}
        </label>
    ))
    return (
        <div className="p-5 bottom-10 left-10 absolute bg-white shadow h-60 w-96 text-black z-50">
                {favoriteList()}
            <div className="pb-5">
                <img className="inline pr-2" src="/favicon.png" />
                <span className="text-xl">Crib Finder </span>
                <span className="text-xs">Data Driven Appartment Hunting</span>
            </div>
            <div className="pb-5" className="text-xs" direction="row" align="center" pad="small" gap="small">
                <span className="float-left">
                    Type
                </span>
                <form className="inline" onChange={(e) => setChecked(e.target.name) }>
                    {radio}
                </form>
            </div>

            <div className="pt-5">
                <span className="float-left" size="small" color="brand">
                    Price
                </span>

                <div className="9/12 pl-12">
                <RangeSlider
                    min={0}
                    max={3000}
                    stepSize={100}
                    labelStepSize={500}
                    value={priceRange}
                    onChange={(value) => {
                        console.log(value)
                        setPriceRange(value)
                        }}
                    vertical={false}
                />
                </div>

                <div className="pt-5">
                <span className="float-left" size="small" color="brand">
                    Rooms
                </span>

                <div className=" pl-12">
                <input className="focus:ring-indigo-500 focus:border-indigo-500 block m-auto w-5/12 pl-10 sm:text-sm border-gray-300 rounded-md" type="number" />
                </div>
            </div>
        </div>
    </div>
    )
}

export default ListingControls
